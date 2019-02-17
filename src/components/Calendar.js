/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import dateFns from 'date-fns';
import './Calendar.css';

export const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  const dateFormat = 'MMMM YYYY';
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div
          id="prevMonth"
          role="presentation"
          className="icon"
          onClick={prevMonth}
        >
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>{dateFns.format(currentMonth, dateFormat)}</span>
      </div>
      <div
        id="nextMonth"
        role="presentation"
        className="col col-end"
        onClick={nextMonth}
      >
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};
const CalendarDays = ({ currentMonth }) => {
  const dateFormat = 'dddd';
  const days = [];
  const startDate = dateFns.startOfWeek(currentMonth);

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <div className="col col-center" key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>,
    );
  }

  return <div className="days row">{days}</div>;
};
export const CalendarCells = ({
  currentMonth,
  preferDate,
  unavailableDate,
  filterByName,
  isEditing,
  updateByDate,
}) => {
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = 'D';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = '';
  let preferCount = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = dateFns.format(day, dateFormat);
      const compositeDate = `${day.getFullYear()}-${(day.getMonth() + 1 < 10
        ? '0'
        : '')
        + (day.getMonth() + 1)}-${(day.getDate() < 10 ? '0' : '')
        + day.getDate()}`;

      preferCount = preferDate[compositeDate];

      days.push(
        <div
          role="presentation"
          className={`dateDiv col cell ${
            !dateFns.isSameMonth(day, monthStart)
              ? 'disabled'
              : isEditing.status
                ? 'pointer'
                : ''
          } 
        ${
          compositeDate in preferDate
            ? `${
              isEditing.status
                ? isEditing.dateType === 'preferDate'
                  ? ' choicePrefer'
                  : ''
                : 'prefer'
            }`
            : ''
        }
        ${
          isEditing.status && isEditing.dateType === 'unavailableDate'
            ? unavailableDate.some(date => date === compositeDate)
              ? ' choiceUnavailableDate'
              : ''
            : ''
        }
          `}
          key={day}
          onClick={() => (isEditing.status
            ? updateByDate(isEditing.dateType, compositeDate)
            : false)
          }
        >
          <div className="statistics">
            {preferCount
              ? isEditing.status
                ? isEditing.dateType === 'preferDate'
                  ? '已選'
                  : '☆'
                : filterByName === 'ALL'
                  ? `可出席人數${preferCount}`
                  : '☆'
              : ''}

            {unavailableDate.indexOf(compositeDate) !== -1 ? (
              isEditing.status ? (
                isEditing.dateType === 'unavailableDate' ? (
                  '已選'
                ) : (
                  '✕'
                )
              ) : (
                <span className="unavailableMark">
                  {filterByName === 'ALL' ? '（有人這天不行）' : '✕'}
                </span>
              )
            ) : (
              ''
            )}
          </div>
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>,
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export const NameFilter = ({ userList, filterByName, setFilterName }) => (
  <select
    id="nameFilter"
    value={filterByName}
    onChange={e => setFilterName(e.target.value)}
  >
    <option value="ALL">顯示全部</option>
    {userList.map(name => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </select>
);

export const EditDateByName = ({
  filterByName,
  isEditing,
  onEditClick,
  setFilterName,
}) => (
  <React.Fragment>
    <button
      id="editPrefer"
      type="button"
      disabled={isEditing.status}
      onClick={() => onEditClick('preferDate')}
    >
      編輯可以的時間
    </button>
    <button
      id="editUnavailable"
      type="button"
      disabled={isEditing.status}
      onClick={() => onEditClick('unavailableDate')}
    >
      編輯不可以的時間
    </button>
    <span id="editHint">
      {isEditing.status
        ? `正在編輯 ${filterByName} ${
          isEditing.dateType === 'preferDate' ? '可以優先' : '無法'
        }出席的日期`
        : ''}
    </span>
    {!isEditing.status ? (
      <button
        style={{ float: 'right' }}
        type="button"
        onClick={() => setFilterName('ALL')}
      >
        顯示結果
      </button>
    ) : (
      ''
    )}
  </React.Fragment>
);

class Calendar extends Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      isEditing: { status: false },
      currentMonth: today,
      selectedDate: today,
    };
  }

  nextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.addMonths(currentMonth, 1),
    });
  };

  prevMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.subMonths(currentMonth, 1),
    });
  };

  onEditClick = (editDateType) => {
    const isEditing = editDateType
      ? { status: true, dateType: editDateType }
      : { status: false };
    this.setState({
      isEditing,
    });
  };

  render() {
    const {
      dateStatistics,
      userList,
      filterByName,
      setFilterName,
      updateByDate,
    } = this.props;
    const { preferDate, unavailableDate } = dateStatistics;
    const { currentMonth, selectedDate, isEditing } = this.state;
    return (
      <div>
        <div id="filterBox">
          <span>篩選</span>
          <NameFilter
            userList={userList}
            filterByName={filterByName}
            setFilterName={setFilterName}
          />
          {filterByName !== 'ALL' ? (
            <EditDateByName
              filterByName={filterByName}
              isEditing={isEditing}
              onEditClick={this.onEditClick}
              setFilterName={setFilterName}
            />
          ) : (
            ''
          )}
        </div>
        <div className="calendar">
          <CalendarHeader
            currentMonth={currentMonth}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
          />
          <CalendarDays currentMonth={currentMonth} />
          <CalendarCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            preferDate={preferDate}
            unavailableDate={unavailableDate}
            filterByName={filterByName}
            isEditing={isEditing}
            updateByDate={updateByDate}
          />
        </div>
        {isEditing.status ? (
          <button
            className="editComplete"
            type="button"
            onClick={() => this.onEditClick()}
          >
            完成編輯
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Calendar;
