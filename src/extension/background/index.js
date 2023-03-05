const STATUS = {
  SECURE: "secure",
  INSECURE: "insecure",
  WARN: "warn",
};

const ICON_PATHS = {
  [STATUS.INSECURE]: "/icons/icon-insecure.png",
  [STATUS.SECURE]: "/icons/icon-secure.png",
  [STATUS.WARN]: "/icons/icon-warn.png",
};

function changeExtensionIcon(tabId, status) {
  chrome.action.setIcon({ path: ICON_PATHS[status], tabId });
}

async function handleTabUpdated(tabId, { status }, tab) {
  if (status === "complete" && tab.active && tab.url.startsWith("http")) {
    const { favIconUrl, title, url } = tab;

    const { hostname } = new URL(url);
    const verifiedSites = await chrome.storage.local.get();

    if (verifiedSites[hostname]) {
      changeExtensionIcon(tabId, verifiedSites[hostname]);
      return;
    }

    setTimeout(async () => {
      const image = await chrome.tabs.captureVisibleTab();

      // TODO: Send image to server
      const status =
        typeof image === "string" && !!image ? "secure" : "insecure";

      await chrome.storage.local.set({ [hostname]: status });

      changeExtensionIcon(tabId, status);
    }, 2000);
  }
}

chrome.tabs.onUpdated.addListener(handleTabUpdated);
