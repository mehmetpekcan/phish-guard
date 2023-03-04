import html2canvas from "html2canvas";

console.log("Remote content from extension");

setTimeout(() => {
  const html = document.querySelector("html");

  console.log(window.location);

  html2canvas(html).then(function (canvas) {
    const dataURL = canvas.toDataURL("image/png");

    const image = document.createElement("img");
    image.src = dataURL;

    const newWindow = window.open("");
    newWindow.document.write(image.outerHTML);
  });
}, 1500);
