export const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj));
};
export const jsonToFormData = json => {
  let formData = new FormData();
  for (let k in json) {
    let value;
    if (json[k] instanceof Array) {
      value = json[k];
    } else if (json[k] instanceof Object) {
      value = JSON.stringify(json[k]);
    } else {
      value = json[k];
    }
    formData.append(k, value);
  }
  return formData;
};
