export function stripMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}
