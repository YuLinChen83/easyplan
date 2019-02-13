const initState = {
  userList: ['Tiffany', 'Sara', 'Tyler'],
  visibilityFilter: 'ALL',
  selectList: [
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
const strToArr = str => str.split(',').map(item => item.trim());

const plandate = (state = initState, action) => {
  let newSelectList;
  let arrpreferDate;
  let arrunavailableDate;
  switch (action.type) {
    case 'INPUT_DATE':
      arrpreferDate = strToArr(action.inputData.preferDate);
      arrunavailableDate = strToArr(action.inputData.unavailableDate);
      if (
        state.selectList.map(item => item.name).includes(action.inputData.name)
      ) {
        // 已存在更新
        newSelectList = state.selectList.map(item => (item.name === action.inputData.name
          ? {
            ...item,
            preferDate: arrpreferDate,
            unavailableDate: arrunavailableDate,
          }
          : item));
      } else {
        // 不存在新增
        newSelectList = [
          ...state.selectList,
          {
            name: action.inputData.name,
            preferDate: arrpreferDate,
            unavailableDate: arrunavailableDate,
          },
        ];
      }
      return {
        ...state,
        selectList: newSelectList,
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        visibilityFilter: action.filter,
      };
    default:
      return state;
  }
};

export default plandate;
