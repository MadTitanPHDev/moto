import fs from "fs";
import path from "path";
import GithubSlugger from "github-slugger";
import { documents, type DocumentMeta } from "./documents";
import { stripMarkdown } from "./text";

const ROOT = path.resolve(process.cwd(), "..");

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function readMarkdown(file: string) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

export function loadDocument(slug: string): { meta: DocumentMeta; content: string; toc: TocItem[] } | null {
  const meta = documents.find((doc) => doc.slug === slug);
  if (!meta) return null;
  const content = readMarkdown(meta.file);
  return { meta, content, toc: extractToc(content) };
}

export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCode = false;

  for (const line of markdown.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const text = stripMarkdown(match[2]);
    items.push({
      level: match[1].length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return items;
}

