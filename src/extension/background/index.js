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

const BASE_URL = "http://api.phishguard.cc";

async function getDomainSimilarity(hostname) {
  const STATUS_CODES = {
    100: STATUS.SECURE,
    200: STATUS.INSECURE,
    201: STATUS.INSECURE,
  };

  const searchParams = new URLSearchParams({ current_domain: hostname });

  const response = await fetch(
    `${BASE_URL}/api/analyse/domain-similarity?${searchParams}`
  );
  const { status_code: statusCode } = await response.json();

  return { status: STATUS_CODES[statusCode] ?? STATUS.WARN };
}

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
      // const { status: domainStatus } = await getDomainSimilarity(hostname);
      // const domainStatus = STATUS.INSECURE

      if (domainStatus === STATUS.SECURE) {
        // TODO: dispatch success events
      } else if (domainStatus === STATUS.WARN) {
        // TODO:directly finish evertything end dispatch warn events
      } else if (domainStatus === STATUS.INSECURE) {
      }

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
