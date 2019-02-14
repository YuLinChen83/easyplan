export const submitData = inputData => ({
  type: 'INPUT_DATE',
  inputData,
});
export const setFilterName = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
