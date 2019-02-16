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
  selectedDate,
  onDateClick,
  preferDate,
  unavailableDate,
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
      const cloneDay = day;
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
            // eslint-disable-next-line no-nested-ternary
            !dateFns.isSameMonth(day, monthStart)
              ? 'disabled'
              : dateFns.isSameDay(day, selectedDate)
                ? 'selected'
                : ''
          } 
        ${compositeDate in preferDate ? 'prefer' : ''}
          `}
          key={day}
          onClick={() => onDateClick(dateFns.parse(cloneDay))}
        >
          <div className="statistics">
            {preferCount ? `可以人數${preferCount}` : ''}

            {unavailableDate.indexOf(compositeDate) !== -1 ? (
              <span className="unavailableMark">（有人不行）</span>
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
  <div>
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
  </div>
);

class Calendar extends Component {
  constructor() {
    super();
    const mockDate = new Date();
    this.state = {
      currentMonth: mockDate,
      selectedDate: mockDate,
    };
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

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

  render() {
    const {
      dateStatistics,
      userList,
      filterByName,
      setFilterName,
    } = this.props;
    const { preferDate, unavailableDate } = dateStatistics;
    const { currentMonth, selectedDate } = this.state;
    return (
      <div>
        <NameFilter
          userList={userList}
          filterByName={filterByName}
          setFilterName={setFilterName}
        />
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
            onDateClick={this.onDateClick}
            preferDate={preferDate}
            unavailableDate={unavailableDate}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
