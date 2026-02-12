export default function decorate(block) {
  const meta = {};
  [...block.children].forEach((row) => {
    const key = row.children[0]?.textContent?.trim().toLowerCase();
    const value = row.children[1]?.textContent?.trim();
    if (key && value) meta[key] = value;
  });
  if (meta.title) document.title = meta.title;
  if (meta.description) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', meta.description);
  }
  // Remove just the metadata wrapper, not the whole section container
  const wrapper = block.closest('.metadata-wrapper');
  if (wrapper) {
    wrapper.remove();
  } else {
    block.remove();
  }
}
