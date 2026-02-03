import { qsa } from "./dom";

function normaliseWhitespace(html: string): string {
  const trimmed = html.replace(/^\n+/, "").replace(/\n+$/, "");
  const lines = trimmed.split("\n");

  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return "";

  const indents = nonEmpty
    .map((l) => l.match(/^(\s*)/)?.[1]?.length ?? 0)
    .filter((n) => n > 0);

  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;

  return lines
    .map((l) => (minIndent > 0 ? l.replace(new RegExp(`^\\s{0,${minIndent}}`), "") : l))
    .join("\n")
    .trim();
}

export function renderCodeFromTemplates(): void {
  const codeBlocks = qsa<HTMLElement>("[data-code-source]");
  for (const codeBlock of codeBlocks) {
    const id = codeBlock.getAttribute("data-code-source");
    if (!id) continue;

    const tpl = document.getElementById(id);
    if (!(tpl instanceof HTMLTemplateElement)) continue;

    const raw = tpl.innerHTML;
    codeBlock.textContent = normaliseWhitespace(raw);
  }
}
