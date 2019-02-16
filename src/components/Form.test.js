import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

const setup = (props) => {
  const enzymeWrapper = shallow(<Form {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

describe('<Form />', () => {
  const initProps = {
    plandate: {
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
    },
    onSubmit: jest.fn(),
  };

  const { enzymeWrapper } = setup(initProps);
  describe('render', () => {
    it('renders without crashing', () => {
      expect(enzymeWrapper.length).toBe(1);
      expect(enzymeWrapper).toMatchSnapshot();
    });

    describe('props method', () => {
      it('should trigger onSubmit', () => {
        const event = { preventDefault: () => false };
        enzymeWrapper.find('form').simulate('submit', event);
        expect(initProps.onSubmit).toHaveBeenCalled();
      });

      describe('should accept input onchange', () => {
        it('should trigger setState', () => {
          let event = { target: { value: 'Ben' } };
          enzymeWrapper.find('#name').simulate('change', event);
          expect(enzymeWrapper.state().inputName).toBe('Ben');

          event = { target: { value: '2019-02-28, 2019-04-03' } };
          enzymeWrapper.find('#preferDate').simulate('change', event);
          expect(enzymeWrapper.state().inputPreferDate).toBe(
            '2019-02-28, 2019-04-03',
          );

          event = { target: { value: '2019-03-05' } };
          enzymeWrapper.find('#unavailableDate').simulate('change', event);
          expect(enzymeWrapper.state().inputUnavailableDate).toBe('2019-03-05');
        });
      });
    });
  });
});
