import React from 'react';
import {Text, View} from 'react-native';

// Provided base components
import SquirclePathProperties from './SquirclePathProperties';
import {
  PieShape,
  SquircleShape,
  SquircleSliderIcon,
  squircleIconSize,
} from './SquircleShapes';

/**
 * Squricle slider is a slider component that can be used to select a value between a min and max value.
 *
 * @param value Current value of slider.
 * @param minValue Minimum value of slider.
 * @param maxValue Maximum value of slider.
 * @param onChangeValue Callback to update value of slider.
 */
export default function SquircleSlider({
  value,
  minValue,
  maxValue,
  onChangeValue,
}: {
  value: number;
  minValue: number;
  maxValue: number;
  onChangeValue: (newValue: number) => void;
}) {
  // TODO write squircle component.
  return (
    <View>
      <Text>{value}</Text>
    </View>
  );
}
