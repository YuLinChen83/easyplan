import { connect } from 'react-redux';
import { setFilterName } from '../actions';
import Calendar from '../components/Calendar';

const dateStatistics = (filter, selectedList) => {
  const filterselectedList = filter !== 'ALL'
    ? selectedList.filter(item => item.name === filter)
    : selectedList;
  const { preferDate, unavailableDate } = filterselectedList.reduce(
    (parentPrev, parentCur) => ({
      preferDate: [...parentPrev.preferDate, ...parentCur.preferDate],
      unavailableDate: [
        ...new Set(
          [...parentPrev.unavailableDate, parentCur.unavailableDate].reduce(
            (prev, cur) => prev.concat(cur),
            [],
          ),
        ),
      ],
    }),
    { preferDate: [], unavailableDate: [] },
  );
  const preferDateStatistics = preferDate.reduce((prev2, cur2) => {
    // eslint-disable-next-line no-param-reassign
    prev2[cur2] = (prev2[cur2] || 0) + 1;
    // eslint-enable
    return prev2;
  }, {});
  const finalDateStatistics = {
    preferDate: preferDateStatistics,
    unavailableDate,
  };
  return finalDateStatistics;
};
const mapStateToProps = state => ({
  plandate: state,
  dateStatistics: dateStatistics(state.filterByName, state.selectedList),
  userList: state.userList,
  filterByName: state.filterByName,
});

const mapDispatchToProps = dispatch => ({
  setFilterName: filter => dispatch(setFilterName(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
