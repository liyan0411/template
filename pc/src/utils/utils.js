export const sGetObject = k => {
  try {
    var v = sessionStorage.getItem(k);
    return v == null ? null : JSON.parse(v);
  } catch (e) {
    console.log(e);
  }
};
export const sSetObject = (k, v) => {
  try {
    sessionStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
};
