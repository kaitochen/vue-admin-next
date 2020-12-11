export const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj));
};
export const jsonToFormData = json => {
  let formData = new FormData();
  for (let k in json) {
    let value;
    if (json[k] instanceof Array) {
      value = JSON.stringify(json[k]);
    } else if (json[k] instanceof Object) {
      value = JSON.stringify(json[k]);
    } else {
      value = json[k];
    }
    formData.append(k, value);
  }
  return formData;
};
export const stringToJson = str => {
  const arr = str.split("&");
  const obj = {};
  arr.forEach(item => {
    const key = item.split("=")[0];
    const value = item.split("=")[1];
    obj[key] = value;
  });
  return obj;
};
export const queryToString = query => {
  let str = [];
  for (const k in query) {
    str.push(`${k}=${query[k]}`);
  }
  if (str.length > 0) {
    return "?" + str.join("&");
  } else {
    return "";
  }
};
