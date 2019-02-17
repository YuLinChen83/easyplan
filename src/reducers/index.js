const initState = {
  userList: ['Tiffany', 'Sara', 'Tyler'],
  filterByName: 'Tyler',
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
  let selectedDate;
  let dateType;
  let userSelectedData;
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
    case 'UPDATE_SINGLE_DATE': // toggle
      ({ selectedDate, dateType } = action.payload);
      // 此人還沒選過日期 先新增此人空 data
      if (
        state.selectedList.filter(item => item.name === state.filterByName)
          .length === 0
      ) {
        newSelectedList = [
          ...state.selectedList,
          { name: state.filterByName, preferDate: [], unavailableDate: [] },
        ];
      } else {
        newSelectedList = state.selectedList;
      }
      userSelectedData = newSelectedList.filter(
        item => item.name === state.filterByName,
      );
      if (userSelectedData[0][dateType].indexOf(selectedDate) === -1) {
        // 此人選的日期中該日期不存在 新增
        newSelectedList = newSelectedList.map(item => (item.name === state.filterByName
          ? { ...item, [dateType]: [...item[dateType], selectedDate] }
          : item));
      } else {
        // 此人選的日期中該日期存在 移除
        newSelectedList = newSelectedList.map(item => (item.name === state.filterByName
          ? {
            ...item,
            [dateType]: item[dateType].filter(
              date => date !== selectedDate,
            ),
          }
          : item));
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
