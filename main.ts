// One Sentence for a Traveler from 1800.
// Writes a single sentence explaining the modern internet to a
// time traveler from 1800, using only things they already know:
// libraries, post offices, roads, letters, books.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SENTENCE =
  "Imagine every library and post office on earth joined by one road, " +
  "so a letter crosses the sea in a blink and any book you name opens " +
  "in your hands.";

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

// The gate: one line, 1 to 200 characters, nothing but the sentence.
if (SENTENCE.length < 1 || SENTENCE.length > 200) {
  fail(`sentence is ${SENTENCE.length} characters, must be 1-200`);
}
if (SENTENCE.trim() !== SENTENCE) {
  fail("sentence has leading or trailing whitespace");
}
if (SENTENCE.includes("\n") || SENTENCE.includes("\r")) {
  fail("sentence must be a single line");
}
if (!SENTENCE.endsWith(".")) {
  fail("sentence must end with a full stop");
}

// The brief forbids words coined after 1800, so refuse any that slip in.
const MODERN_WORDS = [
  "internet",
  "computer",
  "website",
  "online",
  "email",
  "digital",
  "screen",
  "phone",
  "web",
];
const words = SENTENCE.toLowerCase().split(/[^a-z]+/).filter(Boolean);
for (const word of MODERN_WORDS) {
  if (words.includes(word)) {
    fail(`sentence uses a post-1800 word: ${word}`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, SENTENCE, "utf8");
console.log(`wrote ${SENTENCE.length} characters to ${outFile}`);
