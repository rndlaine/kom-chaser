export const setWithExpiry = (key, value, ttl) => {
  const item = { value: value, expiry: new Date().getTime() + ttl };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = key => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);

  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

export const setWithItemExpiry = (key, value, ttl) => {
  const now = new Date();

  let updatedObject = {};
  Object.keys(value).forEach(prop => {
    updatedObject[prop] = { ...value[prop], expiry: now.getTime() + ttl };
  });

  localStorage.setItem(key, JSON.stringify(updatedObject));
};

export const getWithItemExpiry = key => {
  const now = new Date();

  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const value = JSON.parse(itemStr);

  let updatedObject = {};
  Object.keys(value).forEach(prop => {
    if (now.getTime() < value[prop].expiry) {
      updatedObject[prop] = { ...value[prop], expiry: now.getTime() };
    }
  });

  localStorage.setItem(key, JSON.stringify(updatedObject));

  return updatedObject;
};
