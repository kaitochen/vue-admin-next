export const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj));
};
export const jsonToFormData = json => {
  let formData = new FormData();
  for (let k in json) {
    formData.append(k, json[k]);
  }
  return formData;
};
