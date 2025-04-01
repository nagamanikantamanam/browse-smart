export const getStorage = async <T>(key: string): Promise<T | undefined> => {
  const result = await chrome.storage.local.get(key);
  return result[key];
};

export const setStorage = async (key: string, value: any) => {
  await chrome.storage.local.set({ [key]: value });
};
