export const TAKE_SCREENSHOT_ACTION = {
  type: "TAKE_SCREENSHOT",
};

const receiveMessageResponse = (response) => {
  const image = document.createElement("img");
  image.src = response;

  const newWindow = window.open("");
  newWindow.document.write(image.outerHTML);
};

// We are not able to use `chrome.tabs` in content scripts
// thats why we are sending message to background script
// to take the screenshot
chrome.runtime.sendMessage(TAKE_SCREENSHOT_ACTION, receiveMessageResponse);
