const BASE_URL = "https://api.phishguard.cc";

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

const DOMAIN_STATUS_CODES = {
  100: STATUS.SECURE,
  200: STATUS.INSECURE,
  201: STATUS.INSECURE,
};

const FETCH_STATUS = {
  SUCCESS: "success",
  FAILED: "failed",
};

const LOGO_STATUS_CODES = {
  100: FETCH_STATUS.SUCCESS,
  200: FETCH_STATUS.FAILED,
};

function changeExtensionIcon(tabId, status) {
  chrome.action.setIcon({ path: ICON_PATHS[status], tabId });
}

async function getDomainSimilarity(hostname) {
  const searchParams = new URLSearchParams({ current_domain: hostname });

  const response = await fetch(
    `${BASE_URL}/api/analyse/domain-similarity?${searchParams}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const { status_code: statusCode, content } = await response.json();

  return {
    status: DOMAIN_STATUS_CODES[statusCode] ?? STATUS.WARN,
    domain: content,
  };
}

async function findLogoByScreenshot(base64image) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      image: base64image.replace("data:image/jpeg;base64,", ""),
    }),
  };

  const response = await fetch(
    `${BASE_URL}/api/analyse/find-logo-by-screenshot`,
    options
  );
  const { status_code: statusCode, content } = await response.json();

  return {
    status: LOGO_STATUS_CODES[statusCode] ?? FETCH_STATUS.FAILED,
    logo: content,
  };
}

async function handleTabUpdated(tabId, { status }, tab) {
  if (status === "complete" && tab.active && tab.url.startsWith("http")) {
    const { url } = tab;

    const { hostname } = new URL(url);
    const verifiedSites = await chrome.storage.local.get();

    // Read from Cache
    if (verifiedSites[hostname]) {
      changeExtensionIcon(tabId, verifiedSites[hostname]);
      return;
    }

    let finalStatus;

    const { status: domainStatus, domain } = await getDomainSimilarity(
      hostname
    );

    if (domainStatus === STATUS.SECURE) {
      finalStatus = STATUS.SECURE;
    } else if (domainStatus === STATUS.WARN) {
      finalStatus = STATUS.WARN;
    } else if (domainStatus === STATUS.INSECURE) {
      const image = await chrome.tabs.captureVisibleTab();

      const { status: logoStatus, logo } = await findLogoByScreenshot(image);

      if (logoStatus === FETCH_STATUS.SUCCESS) {
        finalStatus = STATUS.INSECURE;
      } else if (logoStatus === FETCH_STATUS.FAILED) {
        finalStatus = STATUS.WARN;
      }
    }

    await chrome.storage.local.set({ [hostname]: finalStatus });
    changeExtensionIcon(tabId, finalStatus);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onUpdated.addListener(handleTabUpdated);
});
