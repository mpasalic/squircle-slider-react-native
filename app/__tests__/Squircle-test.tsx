import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import SquircleSlider from '../src/SquircleSlider';

// https://reactnativetesting.io/component/testing.html
it('renders', () => {
  const component = render(
    <SquircleSlider
      value={500}
      minValue={100}
      maxValue={1000}
      onChangeValue={() => {}}
    />,
  );
  expect(component).toBeTruthy();
});

it('renders value', () => {
  const onChangeValue = jest.fn();
  const {queryByText} = render(
    <SquircleSlider
      value={500}
      minValue={100}
      maxValue={1000}
      onChangeValue={onChangeValue}
    />,
  );
  expect(queryByText('500')).not.toBeNull();
  expect(onChangeValue).toBeCalledTimes(0);
});

// TODO write more tests.
