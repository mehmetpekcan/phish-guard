console.log("BG?");

const ACTIVATED_TABS = new Set();

async function getTabId() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return tab.id;
}

async function setExtensionIcon() {
  const tabId = await getTabId();
  const activatedBefore = ACTIVATED_TABS.has(tabId);

  if (activatedBefore) {
    return;
  }

  chrome.action.setIcon({ path: "/icons/icon-secure.png", tabId });
  ACTIVATED_TABS.add(tabId);
}

chrome.tabs.onActivated.addListener(setExtensionIcon);

const onMessage = (request, sender, sendResponse) => {
  // TODO: Fix import problem then import action type
  if (request.type === "TAKE_SCREENSHOT") {
    setTimeout(() => {
      chrome.tabs.captureVisibleTab(null, {}, function (dataUrl) {
        sendResponse(dataUrl);
      });
    }, 1000);

    return true;
  }
};

chrome.runtime.onMessage.addListener(onMessage);
