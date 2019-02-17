export const submitData = inputData => ({
  type: 'INPUT_DATE',
  inputData,
});
export const updateByDate = (dateType, selectedDate) => ({
  type: 'UPDATE_SINGLE_DATE',
  payload: {
    dateType,
    selectedDate,
  },
});
export const setFilterName = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
