const ACTIVATED_TABS = new Set();

async function getTabId() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return tab.id;
}

async function takeScreenshot() {
  return chrome.tabs.captureVisibleTab();
}

async function setExtensionIcon(tabId) {
  chrome.action.setIcon({ path: "/icons/icon-secure.png", tabId });
}

async function handleTabUpdated(tabId, { status }, tab) {
  if (status === "complete" && tab.active && tab.url.startsWith("http")) {
    console.log(tab);

    setTimeout(async () => {
      setExtensionIcon(tabId);
      const image = await takeScreenshot();
      console.log(image);
    }, 200);
  }
}

chrome.tabs.onUpdated.addListener(handleTabUpdated);
