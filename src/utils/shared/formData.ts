export const convertObjectToFormData = (values: Object): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export const convertToFormData = (key: string, value: any): FormData => {
  const formData = new FormData();
  formData.append(key, value);
  return formData;
};
