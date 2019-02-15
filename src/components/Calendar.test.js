import React from 'react';
import { shallow } from 'enzyme';
import Calendar, {
  NameFilter,
  CalendarHeader,
  CalendarCells,
} from './Calendar';

const setup = (props) => {
  const enzymeWrapper = shallow(<Calendar {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};
const setupNameFilter = (props) => {
  const enzymeWrapper = shallow(<NameFilter {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};
const setupCalendarHeader = (props) => {
  const enzymeWrapper = shallow(<CalendarHeader {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};
const setupCalendarCells = (props) => {
  const enzymeWrapper = shallow(<CalendarCells {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

describe('<Calendar/ >', () => {
  const initProps = {
    dateStatistics: { preferDate: {}, unavailableDate: [] },
    userList: [],
    filterByName: 'ALL',
    preferDate: {},
    unavailableDate: [],
    setFilterName: jest.fn(),
    prevMonth: jest.fn(),
    nextMonth: jest.fn(),
    onDateClick: jest.fn(),
    currentMonth: 2,
    selectedDate: 2,
  };

  describe('render', () => {
    it('no crashing', () => {
      const { enzymeWrapper } = setup(initProps);
      expect(enzymeWrapper.length).toBe(1);
      expect(enzymeWrapper).toMatchSnapshot();
    });

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup(initProps);
      expect(enzymeWrapper.find('NameFilter').length).toEqual(1);
      expect(enzymeWrapper.find('CalendarHeader').length).toEqual(1);
      expect(enzymeWrapper.find('CalendarDays').length).toEqual(1);
      expect(enzymeWrapper.find('CalendarCells').length).toEqual(1);
    });

    it('should trigger "onDateClick"', () => {
      const { enzymeWrapper } = setupCalendarCells(initProps);
      enzymeWrapper
        .find('.dateDiv')
        .first()
        .simulate('click');
      expect(initProps.onDateClick).toHaveBeenCalled();
    });

    it('should trigger "prevMonth", "nextMonth"', () => {
      const { enzymeWrapper } = setupCalendarHeader(initProps);
      enzymeWrapper.find('#prevMonth').simulate('click');
      expect(initProps.prevMonth).toHaveBeenCalled();
      expect(enzymeWrapper.props().currentMonth).toBe(1);

      enzymeWrapper.find('#nextMonth').simulate('click');
      expect(initProps.nextMonth).toHaveBeenCalled();
      expect(enzymeWrapper.props().currentMonth).toBe(3);
    });

    it('should trigger "setFilterName"', () => {
      const { enzymeWrapper } = setupNameFilter(initProps);
      const event = { target: { value: 'Jack' } };
      enzymeWrapper.find('#nameFilter').simulate('change', event);
      expect(initProps.setFilterName).toHaveBeenCalledWith(event.target.value);
    });
  });
});
