import { getStorage, setStorage } from '../utils/helpers';
const AD_BLOCKER_RULES: chrome.declarativeNetRequest.Rule[] = [
  {
    id: 1,
    action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
    condition: { urlFilter: '*://*.doubleclick.net/*' },
  },
  {
    id: 2,
    action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
    condition: { urlFilter: '*://*.googlesyndication.com/*' },
  },
];
const setBlocking = (enabled: boolean): void => {
  if (enabled) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: AD_BLOCKER_RULES.map((rule) => rule.id),
      addRules: AD_BLOCKER_RULES,
    });
  } else {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: AD_BLOCKER_RULES.map((rule) => rule.id),
      addRules: [],
    });
  }
};
chrome.runtime.onInstalled.addListener(async (): Promise<void> => {
  const enabled = (await getStorage<boolean>('enabled')) || true;
  setBlocking(enabled);
  await setStorage('totalAdsBlocked', 0);
});
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
  async (): Promise<void> => {
    const totalAdsBlocked = (await getStorage<number>('totalAdsBlocked')) || 0;
    await setStorage('totalAdsBlocked', totalAdsBlocked + 1);
  }
);
chrome.storage.onChanged.addListener((change): void => {
  if (change.enabled) {
    setBlocking(change.enabled.newValue);
  }
});

chrome.runtime.onMessage.addListener((message, _, __) => {
  console.log('message reached here ');
  if (message.action === 'open_side_panel') {
    console.log('message matched');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        console.log('triggred');
        chrome.sidePanel
          .open({ tabId: tabs[0].id })
          .catch((err) => console.error('Failed to open side panel:', err));
      }
    });
  }
});
