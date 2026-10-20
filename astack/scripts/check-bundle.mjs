#!/usr/bin/env node
// Checks astack's own conventions. Run from anywhere:
//   node astack/scripts/check-bundle.mjs
// Exits 1 and names every failure. Every rule here exists because the
// convention was broken at least once by hand.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = path.join(ROOT, "skills");
const MODE = path.join(SKILLS, "astack-mode", "SKILL.md");
const PLAYBOOKS = path.join(SKILLS, "astack-mode", "playbooks");
const ENTRY = "astack-mode";
const TERMINAL_PLAYBOOK = "playbook-handoff.md";
// A depth skill declares its scope; a principle does not. That is the stated
// convention, so derive the split from the files instead of hardcoding a list
// that has to be edited every time a depth skill is added.
const declaresScope = (text) => /^\*\*Scope:\*\*/m.test(text);

const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
const read = (p) => fs.readFileSync(p, "utf8");
const lsDirs = (p) => fs.readdirSync(p, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

function walk(dir, out = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p, out);
		else if (e.name.endsWith(".md")) out.push(p);
	}
	return out;
}

function frontmatter(text) {
	if (!text.startsWith("---\n")) return null;
	const end = text.indexOf("\n---\n", 4);
	if (end < 0) return null;
	const fields = {};
	for (const line of text.slice(4, end).split("\n")) {
		const m = /^([a-z_-]+):\s*(.*)$/.exec(line);
		if (m) fields[m[1]] = m[2].replace(/^"(.*)"$/, "$1").trim();
	}
	return fields;
}

// --- 1. Skill frontmatter and conventions -----------------------------------
const skillDirs = lsDirs(SKILLS).sort();
const skillText = new Map(
	skillDirs
		.filter((d) => fs.existsSync(path.join(SKILLS, d, "SKILL.md")))
		.map((d) => [d, read(path.join(SKILLS, d, "SKILL.md"))]),
);
const DEPTH = new Set(skillDirs.filter((d) => d !== ENTRY && declaresScope(skillText.get(d) ?? "")));
const principles = skillDirs.filter((d) => d !== ENTRY && !DEPTH.has(d));

for (const dir of skillDirs) {
	const file = path.join(SKILLS, dir, "SKILL.md");
	const rel = `skills/${dir}/SKILL.md`;
	if (!fs.existsSync(file)) {
		fail(rel, "missing SKILL.md");
		continue;
	}
	const text = read(file);
	const fm = frontmatter(text);
	if (!fm) {
		fail(rel, "frontmatter missing or unterminated");
		continue;
	}
	if (fm.name !== dir) fail(rel, `name "${fm.name}" does not match directory "${dir}"`);
	if (!fm.description) fail(rel, "no description");
	else {
		// A description states its trigger first. That is what the orchestrator reads.
		if (fm.description.length < 40) fail(rel, "description too thin to route on");
		if (dir !== ENTRY && !/^Apply /.test(fm.description)) {
			fail(rel, 'description must open with "Apply ..." so the trigger comes first');
		}
	}
	if (dir !== ENTRY && !("disable-model-invocation" in fm)) {
		fail(rel, "principles and depth skills set disable-model-invocation (routing goes through astack-mode)");
	}
	// Every principle and depth skill disambiguates itself from its siblings.
	if (dir !== ENTRY && !/^## Related$/m.test(text)) {
		fail(rel, "no '## Related' section (siblings must be cross-linked and disambiguated)");
	}
}

// --- 2. Relative links resolve ---------------------------------------------
for (const file of walk(ROOT)) {
	const text = read(file);
	for (const m of text.matchAll(/\]\((\.\.?\/[^)]+\.md)\)/g)) {
		const target = path.resolve(path.dirname(file), m[1]);
		if (!fs.existsSync(target)) fail(path.relative(ROOT, file), `dead link -> ${m[1]}`);
	}
}

// --- 3. astack-mode tables match what is on disk ---------------------------
const modeText = read(MODE);
const tableNames = new Set();
for (const m of modeText.matchAll(/^\|.*\|\s*`([a-z-]+)`\s*\|\s*$/gm)) tableNames.add(m[1]);
for (const m of modeText.matchAll(/^\|\s*`([a-z-]+)`\s*\|/gm)) tableNames.add(m[1]);

for (const name of [...tableNames].sort()) {
	if (!fs.existsSync(path.join(SKILLS, name))) fail("astack-mode/SKILL.md", `table lists "${name}", which has no skill directory`);
}
for (const p of principles) {
	if (!tableNames.has(p)) fail("astack-mode/SKILL.md", `principle "${p}" exists on disk but is in no table`);
}
for (const d of DEPTH) {
	if (!tableNames.has(d)) fail("astack-mode/SKILL.md", `depth skill "${d}" exists on disk but is in no table`);
}

// --- 4. Every count claim is true ------------------------------------------
// Stale counts are the most common hand-edit failure in this bundle, so every
// place that states one is checked against what is actually on disk.
const playbookFiles = fs.readdirSync(PLAYBOOKS).filter((f) => f.endsWith(".md")).sort();
const RESERVED = new Set([TERMINAL_PLAYBOOK, "playbook-figure-it-out.md"]);
const taskPlaybooks = playbookFiles.filter((f) => !RESERVED.has(f));

const COUNTED = [
	[/(\d+)\s+depth skills?/gi, DEPTH.size, "depth skills"],
	[/(\d+)\s+(?:core\s+)?principles?/gi, principles.length, "principles"],
	[/(\d+)\s+skills?\b/gi, skillDirs.length, "skills"],
	[/(\d+)\s+task playbooks?/gi, taskPlaybooks.length, "task playbooks"],
];
const CLAIM_FILES = [
	MODE,
	path.join(ROOT, "README.md"),
	path.resolve(ROOT, "..", "README.md"),
	path.join(ROOT, "plugin.json"),
	path.join(ROOT, ".cursor-plugin", "plugin.json"),
	// Playbooks state counts too, and were missed by a hand pass once.
	...fs.readdirSync(PLAYBOOKS).filter((f) => f.endsWith(".md")).map((f) => path.join(PLAYBOOKS, f)),
];
for (const file of CLAIM_FILES) {
	if (!fs.existsSync(file)) continue;
	const text = read(file);
	const rel = path.relative(path.resolve(ROOT, ".."), file);
	for (const [re, expected, label] of COUNTED) {
		for (const m of text.matchAll(re)) {
			if (Number(m[1]) !== expected) fail(rel, `claims "${m[0].trim()}" but ${expected} ${label} exist`);
		}
	}
	// A bare "N playbooks" hides whether it means task playbooks or all of them.
	for (const m of text.matchAll(/(\d+)\s+playbooks?/gi)) {
		if (!/task playbooks?/i.test(m[0])) {
			fail(rel, `"${m[0].trim()}" is ambiguous — say "N task playbooks" (reserved: ${[...RESERVED].join(", ")})`);
		}
	}
}

// --- 5. Playbooks ----------------------------------------------------------
const referenced = new Set([...modeText.matchAll(/playbooks\/(playbook-[a-z-]+\.md)/g)].map((m) => m[1]));

for (const f of playbookFiles) {
	if (!referenced.has(f)) fail(`playbooks/${f}`, "orphan: not referenced from astack-mode/SKILL.md");
}
for (const f of referenced) {
	if (!playbookFiles.includes(f)) fail("astack-mode/SKILL.md", `references playbooks/${f}, which does not exist`);
}

for (const f of playbookFiles) {
	const text = read(path.join(PLAYBOOKS, f));
	const rel = `playbooks/${f}`;

	if (!frontmatter(text)) fail(rel, "frontmatter missing or unterminated");

	// Every playbook owes the caller a reply contract. The terminal one is the exception.
	if (f === TERMINAL_PLAYBOOK) {
		if (/^\*\*Reply:\*\*/m.test(text)) fail(rel, "the terminal playbook defines the reply, it does not declare one");
	} else {
		if (!/^\*\*Reply:\*\*/m.test(text)) fail(rel, "no '**Reply:**' contract");
		if (!text.includes(TERMINAL_PLAYBOOK)) fail(rel, `does not route to ${TERMINAL_PLAYBOOK}`);
	}

	// A renamed principle bullet silently duplicates an existing one.
	const block = /^\*\*Principles:\*\*\n((?:-.*\n)+)/m.exec(text);
	if (block) {
		const seen = new Set();
		for (const line of block[1].trim().split("\n")) {
			const name = line.replace(/^-\s*/, "").replace(/\s*\(.*$/, "").trim();
			if (seen.has(name)) fail(rel, `duplicate principle bullet "${name}"`);
			seen.add(name);
		}
	}
}

// --- Report ---------------------------------------------------------------
if (failures.length) {
	console.error(`check-bundle: ${failures.length} problem${failures.length === 1 ? "" : "s"}\n`);
	for (const f of failures) console.error(`  ${f}`);
	process.exit(1);
}
console.log(
	`check-bundle: ok (${principles.length} principles, ${DEPTH.size} depth skills, ` +
		`${playbookFiles.length} playbooks)`,
);
