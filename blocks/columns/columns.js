export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns and convert markdown headings
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }
      // Convert markdown-style headings (# text) to proper HTML heading elements
      if (col.childNodes.length === 1 && col.firstChild.nodeType === Node.TEXT_NODE) {
        const text = col.textContent.trim();
        const match = text.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const [, hashes, content] = match;
          const heading = document.createElement(`h${hashes.length}`);
          heading.textContent = content;
          col.replaceChildren(heading);
        }
      }
    });
  });
}
