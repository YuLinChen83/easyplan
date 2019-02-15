import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

const setup = (props) => {
  const enzymeWrapper = shallow(<App {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

describe('components', () => {
  describe('App', () => {
    const { enzymeWrapper } = setup();
    it('renders without crashing', () => {
      expect(enzymeWrapper.length).toBe(1);
    });
  });
});
