import { useState, useEffect } from 'react';
import { getStorage, setStorage } from './helpers';

export const useAdBlock = () => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [totalAdsBlocked, setTotalAdsBlocked] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const enabledValue = await getStorage<boolean>('enabled');
      setEnabled(enabledValue ?? true);
      const totalAdsValue = await getStorage<number>('totalAdsBlocked');
      setTotalAdsBlocked(totalAdsValue ?? 0);
    };
    fetchData();
    const handleStorageChange = (change: any) => {
      if (change.enabled) {
        setEnabled(change.enabled.newValue);
      }
      if (change.totalAds) {
        setTotalAdsBlocked(change.totalAdsBlocked.newValue);
      }
    };
    chrome.storage.local.onChanged.addListener(handleStorageChange);
    () => {
      return chrome.storage.local.onChanged.removeListener(handleStorageChange);
    };
  });
  const toggleBlocking = async () => {
    setEnabled(!enabled);
    await setStorage('enabled', !enabled);
  };
  const handleClick = () => {
    chrome.runtime.sendMessage({ action: 'open_side_panel' });
  };
  return { enabled, totalAdsBlocked, toggleBlocking, handleClick };
};

export const useTracker = () => {
  const [sites, setSites] = useState<Record<string, number>>({});
  const [limits, setLimits] = useState<Record<string, number>>({});
  useEffect(() => {
    const fetchStorage = async () => {
      const storedSites = await getStorage<Record<string, number>>('sites');
      const storedLimits = await getStorage<Record<string, number>>('limits');

      setSites(storedSites || {});
      setLimits(storedLimits || {});
    };

    fetchStorage();
  }, []);
  const handleLimitChange = (site: string, value: number) => {
    console.log('handle limit change called');
    console.log(site, value / 1000);
    console.log('limits', limits);
    setStorage('limits', { ...limits, [site]: value });
    setLimits((prev) => ({ ...prev, [site]: value }));
  };
  const handleReset = () => {
    setStorage('sites', {});
    setSites({});
  };
  chrome.storage.onChanged.addListener((change): void => {
    if (change.sites) {
      setSites(change.sites.newValue);
    }
  });
  return { sites, limits, handleLimitChange, handleReset };
};
