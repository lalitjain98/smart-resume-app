export const getItem = (key) => JSON.parse(localStorage.getItem(key));

export const setItem = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

export const removeItem = (key) => localStorage.removeItem(key);

export const clear = () => localStorage.clear();
const asyncStorage = {
  async setItem(key, value) {
    await null;
    return Promise.resolve().then(() => localStorage.setItem(key, value));
  },
  async getItem(key) {
    await null;
    return localStorage.getItem(key);
  },
};

export default {
  getItem,
  setItem,
  removeItem,
  clear,
  asyncStorage,
};
