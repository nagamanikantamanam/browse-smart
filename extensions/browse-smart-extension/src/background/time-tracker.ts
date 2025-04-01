import { getStorage } from '../utils/helpers';
import { updateTimeSpent, getDomain } from '../utils/time-tracker';

let activeTab: string | undefined;
let startTime: number | null = null;

chrome.tabs.onActivated.addListener(async (info) => {
  console.log('activated');
  console.log(activeTab);
  const limits = await getStorage<Record<string, number>>('limits');
  if (activeTab && limits) {
    await updateTimeSpent(activeTab, startTime, limits);
  }
  const newTab = await chrome.tabs.get(info.tabId);
  console.log('newtab', newTab);
  if (newTab.url) {
    activeTab = getDomain(newTab.url);
    startTime = Date.now();
  }
});
chrome.tabs.onUpdated.addListener(async (_, __, tab) => {
  const limits = await getStorage<Record<string, number>>('limits');
  if (activeTab && limits) {
    await updateTimeSpent(activeTab, startTime, limits);
  }
  if (tab.url) {
    activeTab = getDomain(tab.url);
    startTime = Date.now();
  }
});
