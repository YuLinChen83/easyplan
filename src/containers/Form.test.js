import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Form from './Form';

const mockStore = configureStore();

const shallowWithStore = (component, store) => {
  const context = { store };
  return shallow(component, { context });
};

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

describe('Form Container', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initState);
    store.dispatch = jest.fn();
    wrapper = shallowWithStore(<Form />, store);
  });

  describe('mapStateToProps', () => {
    it('maps plandate', () => {
      expect(wrapper.props().plandate).toBe(initState);
    });
  });

  describe('mapDispatchToProps', () => {
    it('maps onSubmit to dispatch INPUT_DATE action', () => {
      const inputData = { name: 'Ivy', preferDate: '', unavailableDate: '' };
      wrapper.props().onSubmit(inputData);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'INPUT_DATE',
        inputData,
      });
    });
  });
});
