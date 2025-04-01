import { getStorage, setStorage } from './helpers';

export const updateTimeSpent = async (
  domain: string,
  startTime: number | null,
  dailyLimits: Record<string, number>
): Promise<void> => {
  console.log('update time called');
  if (!domain || !startTime) {
    return;
  }
  const timeEllapsed: number = (Date.now() - startTime) / 1000;
  const sites = await getStorage<Record<string, number>>('sites');
  console.log('sites');
  if (sites) {
    sites[domain] = (sites[domain] || 0) + timeEllapsed;
    await setStorage('sites', sites);
    console.log('checking for limit');
    if (sites[domain] > (dailyLimits[domain] || Infinity)) {
      console.log('test limit passed');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js'],
          });
        }
      });
    }
  }
};

export const getDomain = (url: string): string | undefined => {
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
};
