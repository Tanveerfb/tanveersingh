// scripts/scanLocalPosters.js
// Scans /public/posters/ for images and adds missing entries to gallery.json
// Usage: node scripts/scanLocalPosters.js

const fs = require("fs");
const path = require("path");

const GALLERY_PATH = path.join(__dirname, "../data/gallery.json");
const POSTERS_DIR = path.join(__dirname, "../public/posters");

function readGallery() {
  if (!fs.existsSync(GALLERY_PATH)) return { posters: [] };
  return JSON.parse(fs.readFileSync(GALLERY_PATH, "utf8"));
}

function writeGallery(data) {
  fs.writeFileSync(GALLERY_PATH, JSON.stringify(data, null, 2));
}

function slugify(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function titleCase(str) {
  return str
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function main() {
  if (!fs.existsSync(POSTERS_DIR)) return;
  const files = fs
    .readdirSync(POSTERS_DIR)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const gallery = readGallery();
  const existingSlugs = new Set(gallery.posters.map((p) => p.slug));
  let updated = false;

  for (const file of files) {
    const slug = slugify(file);
    if (existingSlugs.has(slug)) continue;
    gallery.posters.push({
      slug,
      title: titleCase(file),
      image: "/posters/" + file,
    });
    updated = true;
    console.log("Added entry for", file);
  }
  if (updated) writeGallery(gallery);
  else console.log("No new local posters found.");
}

main();
