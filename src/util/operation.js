export const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj));
};
export const jsonToFormData = json => {
  let formData = new FormData();
  for (let k in json) {
    let value;
    if (value instanceof Array) {
      value = json[k];
    } else if (value instanceof Object) {
      value = JSON.stringify(value);
    } else {
      value = json[k];
    }
    formData.append(k, value);
  }
  return formData;
};
