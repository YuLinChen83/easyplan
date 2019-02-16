import reducer from './index';

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

describe('plandateReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });
  it('should handle SET_VISIBILITY_FILTER', () => {
    expect(
      reducer(initState, {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'Ben',
      }),
    ).toEqual({
      ...initState,
      filterByName: 'Ben',
    });
  });
  it('should handle INPUT_DATE', () => {
    expect(
      reducer(initState, {
        type: 'INPUT_DATE',
        inputData: {
          name: 'Ivy',
          preferDate: '2019-02-11,2019-02-23',
          unavailableDate: '',
        },
      }),
    ).toEqual({
      ...initState,
      selectedList: [
        ...initState.selectedList,
        {
          name: 'Ivy',
          preferDate: ['2019-02-11', '2019-02-23'],
          unavailableDate: [''],
        },
      ],
    });
    expect(
      reducer(initState, {
        type: 'INPUT_DATE',
        inputData: {
          name: 'Tiffany',
          preferDate: '2019-02-10,2019-02-25',
          unavailableDate: '2019-02-19',
        },
      }),
    ).toEqual({
      ...initState,
      selectedList: initState.selectedList.map(item => (item.name === 'Tiffany'
        ? {
          ...item,
          preferDate: ['2019-02-10', '2019-02-25'],
          unavailableDate: ['2019-02-19'],
        }
        : item)),
    });
  });
});
