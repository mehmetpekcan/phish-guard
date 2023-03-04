import html2canvas from "html2canvas";

export async function takeScreenShot() {
  const html = document.documentElement;

  const canvas = await html2canvas(html);
  const dataURL = canvas.toDataURL("image/png");
  const img = document.createElement("img");
  img.src = dataURL;
  document.body.append(img);
}
