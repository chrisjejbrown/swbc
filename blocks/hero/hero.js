export default function decorate(block) {
  // Convert markdown-style headings (# text) to proper HTML heading elements
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const text = cell.textContent.trim();
    const match = text.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const [, hashes, content] = match;
      const heading = document.createElement(`h${hashes.length}`);
      heading.textContent = content;
      cell.replaceChildren(heading);
    }
  });
}
