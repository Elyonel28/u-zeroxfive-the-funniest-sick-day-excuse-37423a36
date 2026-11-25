// The Funniest Sick-Day Excuse — make.fun bounty
// u-zeroxfive-the-funniest-sick-day-excuse-37423a36
//
// Writes exactly one line to /output/entry.txt: a sick-day excuse that is
// half believable, fresh, and lands its laugh at the end. Node 22 stdlib only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// One breath, one laugh: the phone that knows you better than you do.
const EXCUSE =
  "My phone's Face ID stopped recognising me this morning. I checked the mirror and honestly I agree with it, so I'm staying home until we sort this out.";

const MAX_CHARS = 200;

function main(): void {
  if (EXCUSE.length === 0 || EXCUSE.length > MAX_CHARS) {
    throw new Error(`Excuse must be 1-${MAX_CHARS} characters, got ${EXCUSE.length}.`);
  }
  if (EXCUSE.trim().length === 0) {
    throw new Error("Excuse must not be only whitespace.");
  }
  if (EXCUSE.includes("\n")) {
    throw new Error("Excuse must be a single line.");
  }

  const outPath = resolve(process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
  // Read it back: the file the judge sees must be exactly the line above.
  const written = readFileSync(outPath, "utf8");
  if (written !== EXCUSE) {
    throw new Error("Written entry does not match the excuse.");
  }
  console.log(`Wrote ${EXCUSE.length} characters to ${outPath}`);
}

main();
