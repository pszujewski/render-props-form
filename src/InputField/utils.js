export const isEmptySetup = formState => fieldName => {
  return formState[fieldName].length === 0;
};
