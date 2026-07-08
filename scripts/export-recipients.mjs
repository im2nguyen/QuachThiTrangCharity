#!/usr/bin/env node
/** Export recipients-2025.ts data to JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Dynamic import of TS won't work easily; parse the RAW block from the file
const src = fs.readFileSync(
  path.join(ROOT, "content/recipients/recipients-2025.ts"),
  "utf8"
);
const rawMatch = src.match(/const RAW = `([\s\S]*?)`;/);
if (!rawMatch) throw new Error("Could not parse RAW from recipients-2025.ts");

const RAW = rawMatch[1];
const SCHOOL_PREFIXES = [
  "THPT",
  "PTNK",
  "PTDT",
  "Trường",
  "Trung học",
  "Trung Học",
];

function detectSchoolAndStudent(text) {
  const trimmed = text.trim();
  for (const prefix of SCHOOL_PREFIXES) {
    const idx = trimmed.indexOf(prefix);
    if (idx === -1) continue;
    const afterPrefix = trimmed.slice(idx);
    let schoolEnd = afterPrefix.length;
    for (const other of SCHOOL_PREFIXES) {
      if (other === prefix) continue;
      const next = afterPrefix.indexOf(other, prefix.length);
      if (next > 0) schoolEnd = Math.min(schoolEnd, next);
    }
    const school = afterPrefix.slice(0, schoolEnd).trim();
    const student = afterPrefix.slice(schoolEnd).trim();
    if (student) return { school, student };
    if (trimmed === school) return { school, student: "" };
  }
  return { student: trimmed };
}

const lines = RAW.split("\n").map((l) => l.trim()).filter(Boolean);
let mode = null;
let currentSchool = "";
const out = [];

for (const line of lines) {
  if (/^Trường\s+HS\s+được\s+HB\s+ĐB\s+3,5\s+triệu/i.test(line)) {
    mode = "special";
    currentSchool = "";
    continue;
  }
  if (/^Trường\s+HS\s+được\s+HB\s+2,5\s+triệu/i.test(line)) {
    mode = "standard";
    currentSchool = "";
    continue;
  }
  if (!mode) continue;
  const m = line.match(/^(\d+)\s*(.*)$/);
  if (!m) continue;
  const rest = m[2].trim();
  if (!rest) continue;
  const { school, student } = detectSchoolAndStudent(rest);
  if (school && student) {
    currentSchool = school;
    out.push({ type: mode, school, student });
    continue;
  }
  if (school && !student) {
    currentSchool = school;
    continue;
  }
  if (!currentSchool) continue;
  out.push({ type: mode, school: currentSchool, student: rest });
}

const dest = path.join(ROOT, "content/data/recipients-2025.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2), "utf8");
console.log(`Wrote ${out.length} recipients to ${dest}`);
