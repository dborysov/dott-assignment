import { render } from 'enzyme';
import React from 'react';
import App from './App';

describe('<App />', () => {
  it('should render as expected', () => {
    expect(render(<App />)).toMatchSnapshot();
  });
});
