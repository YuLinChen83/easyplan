import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Calendar from '../components/Calendar';

const dateStatistics = (filter, selectList) => {
  const filterSelectList = filter !== 'ALL'
    ? selectList.filter(item => item.name === filter)
    : selectList;
  let { preferDate, unavailableDate } = filterSelectList.reduce(
    (parentPrev, parentCur) => ({
      preferDate: [...parentPrev.preferDate, parentCur.preferDate].reduce(
        (prev, cur) => prev.concat(cur),
        [],
      ),
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
  preferDate = preferDate.reduce((prev2, cur2) => {
    // eslint-disable-next-line no-param-reassign
    prev2[cur2] = (prev2[cur2] || 0) + 1;
    // eslint-enable
    return prev2;
  }, {});
  return { preferDate, unavailableDate };
};
const mapStateToProps = state => ({
  plandate: state.plandate,
  dateStatistics: dateStatistics(
    state.plandate.visibilityFilter,
    state.plandate.selectList,
  ),
  userList: state.plandate.userList,
  visibilityFilter: state.plandate.visibilityFilter,
});

const mapDispatchToProps = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
