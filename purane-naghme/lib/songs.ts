export type MusicalKey = "D Major" | "A Major" | "C Major" | "F Major";

export interface Song {
  id: number;
  title: string;
  key: MusicalKey;
  slug: string;
  /** Placeholder audio path — drop matching files into /public/audio/ */
  src: string;
  /** Placeholder cover path — drop matching files into /public/covers/ */
  cover: string;
  /** Deterministic fallback tint used while a real cover image loads/is missing */
  tint: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const TINTS_BY_KEY: Record<MusicalKey, string> = {
  "D Major": "#8a5a34",
  "A Major": "#a3703c",
  "C Major": "#6b4a2f",
  "F Major": "#5c4630",
};

const RAW: { title: string; key: MusicalKey }[] = [
  { title: "Hum Bhool Gaye Har Baat", key: "D Major" },
  { title: "Pal Pal Dil Ke Pass", key: "D Major" },
  { title: "Us Mod Se Shuru Karen", key: "D Major" },
  { title: "Itna Na Mujhse Pyaar Badha", key: "D Major" },
  { title: "Monta Re", key: "D Major" },
  { title: "Mere Mehboob Qayamat Hogi", key: "D Major" },
  { title: "Hum Tere Pyaar Mein Saara", key: "D Major" },
  { title: "Mere Rang Mein Rangne Wali", key: "D Major" },
  { title: "Bahut Jatate Ho Pyaar Humse", key: "D Major" },
  { title: "Aaye Ho Meri Zindagi Tum", key: "D Major" },
  { title: "Mere Samne Wali Khidki Mein", key: "D Major" },
  { title: "Kya Hua Tera Wada", key: "A Major" },
  { title: "Pehla Nasha", key: "A Major" },
  { title: "Aaj Jaane Ki Zid Na Karo", key: "A Major" },
  { title: "Roop Tera Mastana", key: "A Major" },
  { title: "Papa Kehte The Bada Naam Karenge", key: "A Major" },
  { title: "Tumsa Koi Pyaara", key: "A Major" },
  { title: "Pass Woh Aane Lage", key: "A Major" },
  { title: "Chori Chori Dil Tera", key: "A Major" },
  { title: "Ae Mere Humsafar", key: "A Major" },
  { title: "Akela Hai To Kya Gham Hai", key: "A Major" },
  { title: "Dil Deewana", key: "C Major" },
  { title: "Inaam", key: "C Major" },
  { title: "Kalyani", key: "C Major" },
  { title: "Sheesha", key: "C Major" },
  { title: "Haareya", key: "C Major" },
  { title: "Guzaarish", key: "C Major" },
  { title: "Sadqay", key: "C Major" },
  { title: "Arz Kiya Hai", key: "C Major" },
  { title: "Deedar", key: "C Major" },
  { title: "Osanam", key: "F Major" },
  { title: "Majboor", key: "F Major" },
  { title: "Aarzu", key: "F Major" },
  { title: "ishq Ve", key: "F Major" },
  { title: "Ishq De Faniyaar", key: "F Major" },
  { title: "Humsafar", key: "F Major" },
  { title: "Samjhawan", key: "F Major" },
  { title: "Mai Tera", key: "F Major" },
];

export const SONGS: Song[] = RAW.map((s, i) => {
  const slug = slugify(s.title);
  return {
    id: i + 1,
    title: s.title,
    key: s.key,
    slug,
    src: `/audio/${slug}.mp3`,
    cover: `/covers/${slug}.jpg`,
    tint: TINTS_BY_KEY[s.key],
  };
});
