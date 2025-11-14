import fs from "fs";
import path from "path";
import https from "https";
interface SiteData {
  creator?: {
    gamesActive?: string[];
    gamesCompleted?: string[];
  };
}

const siteDataPath = path.join(process.cwd(), "content", "siteData.json");
const siteData = JSON.parse(fs.readFileSync(siteDataPath, "utf-8")) as SiteData;

interface RawgGame {
  background_image?: string | null;
  name: string;
}

interface RawgSearchResponse {
  results: RawgGame[];
}

interface PosterRecord {
  title: string;
  poster: string;
}

const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_KEY;

if (!RAWG_API_KEY) {
  console.error("Missing NEXT_PUBLIC_RAWG_KEY environment variable.");
  process.exit(1);
}

const postersDir = path.join(process.cwd(), "public", "posters");

function ensurePostersDir(): void {
  if (!fs.existsSync(postersDir)) {
    fs.mkdirSync(postersDir, { recursive: true });
  }
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function fetchJson(url: string): Promise<RawgSearchResponse> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Request failed with status ${res.statusCode}`));
          return;
        }

        const chunks: Uint8Array[] = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          try {
            const body = Buffer.concat(chunks).toString("utf-8");
            const parsed = JSON.parse(body) as RawgSearchResponse;
            resolve(parsed);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => reject(error));
  });
}

function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Download failed with status ${res.statusCode}`));
          return;
        }

        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (error) => {
        fs.unlink(destination, () => reject(error));
      });
  });
}

async function main(): Promise<void> {
  ensurePostersDir();

  const games: string[] = [
    ...(siteData.creator?.gamesActive ?? []),
    ...(siteData.creator?.gamesCompleted ?? []),
  ];

  const uniqueGames = Array.from(new Set(games));
  const downloadedPosters: PosterRecord[] = [];

  for (const title of uniqueGames) {
    const slug = slugify(title);
    const searchUrl = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(
      title
    )}`;

    try {
      const response = await fetchJson(searchUrl);
      const firstResult = response.results?.[0];

      if (!firstResult?.background_image) {
        console.warn(`No poster found for ${title}`);
        continue;
      }

      const posterPath = path.join(postersDir, `${slug}.jpg`);
      await downloadFile(firstResult.background_image, posterPath);

      downloadedPosters.push({
        title,
        poster: `/posters/${slug}.jpg`,
      });

      console.log(`Downloaded poster for ${title}`);
    } catch (error) {
      console.error(`Failed to download poster for ${title}:`, error);
    }
  }

  console.log(JSON.stringify(downloadedPosters, null, 2));
}

void main();
