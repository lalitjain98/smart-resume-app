export const removeFalsyValues = (obj) => {
  Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);
  return obj;
};

export const removeFalsyValuesDeep = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeFalsyValuesDeep(obj[key]);
    else if (obj[key] === null || obj[key] === undefined) delete obj[key];
  });
  // console.log("$$$", obj);
  return obj;
};

export const removeKeysDeep = (obj, ...removeKeys) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeKeysDeep(obj[key], ...removeKeys);
    else if (removeKeys.includes(key)) delete obj[key];
  });
  // console.log("$$$", obj);
  return obj;
};

export const createOrUpdateObjectWithKeySameAsValue = (list, obj = {}) => {
  const copy = { ...obj };
  list.forEach((i) => {
    copy[i] = i;
  });
  return copy;
};

export const parseUrl = (url) => url.split('/')[3];

export default {
  removeFalsyValues,
  removeFalsyValuesDeep,
  removeKeysDeep,
  createOrUpdateObjectWithKeySameAsValue,
  parseUrl,
};
