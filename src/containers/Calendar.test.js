import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Calendar from './Calendar';

const mockStore = configureStore();

const shallowWithStore = (component, store) => {
  const context = { store };
  return shallow(component, { context });
};

const initState = {
  filterByName: 'ALL',
  userList: ['Tiffany', 'Sara'],
  selectedList: [
    {
      name: 'Tiffany',
      preferDate: ['2019-02-18', '2019-02-21', '2019-02-28'],
      unavailableDate: ['2019-02-10', '2019-02-14'],
    },
  ],
};

describe('Calendar Container', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initState);
    store.dispatch = jest.fn();
    wrapper = shallowWithStore(<Calendar />, store);
  });

  // 測試不同狀態下是否正確映射
  describe('mapStateToProps', () => {
    it('maps filterByName', () => {
      expect(wrapper.props().filterByName).toBe(initState.filterByName);
    });
    it('maps userList', () => {
      expect(wrapper.props().userList).toBe(initState.userList);
    });
    describe('maps filterByName', () => {
      describe('filterByName: Lin', () => {
        const state = {
          ...initState,
          filterByName: 'Lin',
        };
        store = mockStore(state);
        store.dispatch = jest.fn();
        wrapper = shallowWithStore(<Calendar />, store);
        it('maps filterByName: Lin', () => {
          expect(wrapper.props().filterByName).toBe(initState.filterByName);
        });
      });
      describe('maps filterByName: ALL', () => {
        const state = {
          ...initState,
          filterByName: 'ALL',
        };
        store = mockStore(state);
        store.dispatch = jest.fn();
        wrapper = shallowWithStore(<Calendar />, store);
        it('maps filterByName', () => {
          expect(wrapper.props().filterByName).toBe(initState.filterByName);
        });
      });
    });
  });

  // 測試是否發出正確的action
  describe('mapDisptchtoProps', () => {
    it('map setFilterName ', () => {
      wrapper.props().setFilterName('ALL');
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'SET_VISIBILITY_FILTER',
        filter: 'ALL',
      });
    });
  });
});
