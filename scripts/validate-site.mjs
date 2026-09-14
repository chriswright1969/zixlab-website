import fs from "node:fs";
import path from "node:path";

const root = "dist";
const files = [];
const errors = [];

function walk(directory) {
  for (const name of fs.readdirSync(directory)) {
    const filePath = path.join(directory, name);
    if (fs.statSync(filePath).isDirectory()) walk(filePath);
    else files.push(filePath);
  }
}

walk(root);

for (const filePath of files.filter((file) => file.endsWith(".html"))) {
  const source = fs.readFileSync(filePath, "utf8");
  const headingCount = (source.match(/<h1\b/g) || []).length;

  if (!/^<!doctype html>/i.test(source)) errors.push(`${filePath}: missing doctype`);
  if (headingCount !== 1) errors.push(`${filePath}: expected one h1, found ${headingCount}`);
  if (!/<title>[^<]+<\/title>/.test(source)) errors.push(`${filePath}: missing title`);

  for (const match of source.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const urlPath = match[1];
    const target = urlPath === "/"
      ? path.join(root, "index.html")
      : urlPath.endsWith("/")
        ? path.join(root, urlPath, "index.html")
        : path.join(root, urlPath);

    if (!fs.existsSync(target)) errors.push(`${filePath}: missing internal target ${urlPath}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.filter((file) => file.endsWith(".html")).length} HTML pages; all internal references resolved.`);
