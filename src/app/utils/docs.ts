import { Doc } from "@/types";
import { readdir, stat, readFile } from "fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

const DOCS_PATH = path.join("src", "docs");

function sortByCreatedDate(docs: Doc[], order: string) {
  return docs.sort((a, b) => {
    const dateA = a.createdAt.getTime();
    const dateB = b.createdAt.getTime();

    if (order === "asc") {
      return dateA - dateB; // Ascending order
    } else {
      return dateB - dateA; // Descending order
    }
  });
}

async function doesDocContainSearch(docPath: string, search: string) {
  const content = await readFile(docPath, "utf8");
  if (content.includes(search)) {
    return true;
  }
  return false;
}

export async function fetchDocs({
  order = "desc",
  search,
}: {
  order: string;
  search: string;
}) {
  const files = await readdir(DOCS_PATH);
  const results: Doc[] = [];
  for await (const file of files) {
    const docPath = path.join(DOCS_PATH, file);
    const meta = await stat(docPath);
    const id = randomUUID();

    const doc: Doc = {
      id,
      fileName: file,
      size: meta.size,
      createdAt: meta.birthtime,
      updatedAt: meta.mtime,
    };

    if (search.length) {
      const foundSearchText = await doesDocContainSearch(docPath, search);
      if (foundSearchText) {
        results.push(doc);
      }
    } else results.push(doc);
  }

  const orderedDocs = sortByCreatedDate(results, order);

  return orderedDocs;
}

export function bytesToKB(bytes: number) {
  const kilobytes = bytes / 1024;
  return kilobytes.toFixed(2); // Rounds to 2 decimal places
}
