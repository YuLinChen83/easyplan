const initState = {
  userList: ['Tiffany', 'Sara', 'Tyler'],
  filterByName: 'ALL',
  selectedList: [
    {
      name: 'Tiffany',
      preferDate: ['2019-02-18', '2019-02-21', '2019-02-28'],
      unavailableDate: ['2019-02-10', '2019-02-14'],
    },
    {
      name: 'Sara',
      preferDate: ['2019-02-15', '2019-02-17', '2019-02-28'],
      unavailableDate: ['2019-02-18', '2019-02-14', '2019-02-27'],
    },
  ],
};
const DateStrToArr = str => str.split(',').map(item => item.trim());

const plandateReducer = (state = initState, action) => {
  let newSelectedList;
  switch (action.type) {
    case 'INPUT_DATE':
      if (
        state.selectedList
          .map(item => item.name)
          .includes(action.inputData.name)
      ) {
        newSelectedList = state.selectedList.map(item => (item.name === action.inputData.name
          ? {
            ...item,
            preferDate: DateStrToArr(action.inputData.preferDate),
            unavailableDate: DateStrToArr(action.inputData.unavailableDate),
          }
          : item));
      } else {
        newSelectedList = [
          ...state.selectedList,
          {
            name: action.inputData.name,
            preferDate: DateStrToArr(action.inputData.preferDate),
            unavailableDate: DateStrToArr(action.inputData.unavailableDate),
          },
        ];
      }
      return {
        ...state,
        selectedList: newSelectedList,
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        filterByName: action.filter,
      };
    default:
      return state;
  }
};

export default plandateReducer;
