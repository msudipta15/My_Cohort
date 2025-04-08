// Convert youtube video link to embed link

export function youtubelink(link: string) {
  const embed_link = link.replace("watch", "embed").replace("?v=", "/");
  const el1 = embed_link.split("&")[0];
  const el2 = embed_link.split("&")[1];
  const final_link = el1 + "?" + el2;

  return final_link;
}
