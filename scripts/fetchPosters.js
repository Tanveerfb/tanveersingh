// scripts/fetchPosters.js
// Downloads poster images and updates gallery.json with unique entries.
// Usage: node scripts/fetchPosters.js

const fs = require("fs");
const path = require("path");
const https = require("https");

const GALLERY_PATH = path.join(__dirname, "../data/gallery.json");
const POSTERS_DIR = path.join(__dirname, "../public/posters");

// Example posters to fetch (replace with your own logic or API)
const posters = [
  {
    slug: "star-rail",
    title: "Honkai Star Rail",
    url: "https://example.com/star-rail.jpg", // Replace with real URL
  },
];

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error("Failed to get image: " + response.statusCode));
          return;
        }
        response.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        fs.unlink(dest, () => reject(err));
      });
  });
}

function readGallery() {
  if (!fs.existsSync(GALLERY_PATH)) return { posters: [] };
  return JSON.parse(fs.readFileSync(GALLERY_PATH, "utf8"));
}

function writeGallery(data) {
  fs.writeFileSync(GALLERY_PATH, JSON.stringify(data, null, 2));
}

async function main() {
  if (!fs.existsSync(POSTERS_DIR))
    fs.mkdirSync(POSTERS_DIR, { recursive: true });
  const gallery = readGallery();
  const existingSlugs = new Set(gallery.posters.map((p) => p.slug));
  let updated = false;

  for (const poster of posters) {
    if (existingSlugs.has(poster.slug)) continue;
    const filename = poster.slug + ".jpg";
    const dest = path.join(POSTERS_DIR, filename);
    try {
      await downloadImage(poster.url, dest);
      gallery.posters.push({
        slug: poster.slug,
        title: poster.title,
        image: "/posters/" + filename,
      });
      updated = true;
      console.log("Downloaded and added:", poster.title);
    } catch (err) {
      console.error("Failed to download", poster.title, err.message);
    }
  }
  if (updated) writeGallery(gallery);
  else console.log("No new posters added.");
}

main();
