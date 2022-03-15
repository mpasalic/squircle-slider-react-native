import 'react-native';
import React from 'react';
import App from '../src/App';
import {render} from '@testing-library/react-native';

it('renders', () => {
  const component = render(<App />);
  expect(component).toBeTruthy();
});
