import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {PieShape, SquircleShape, SquircleSliderIcon} from './SquircleShapes';
import SquircleSlider from './SquircleSlider';

const App = () => {
  const [value, setValue] = useState(500);

  return (
    <SafeAreaView>
      <Text>Squircle Components (TODO implement)</Text>
      <SquircleSlider
        value={value}
        minValue={100}
        maxValue={1000}
        onChangeValue={setValue}
      />

      <Text>{'\n'}</Text>
      <Text>Base Components</Text>

      <Text>PieShape</Text>
      <PieShape
        style={{}}
        fillColor="black"
        backgroundColor="transparent"
        radius={100}
        fillAngle={200}
      />

      <Text>SquircleShape (inner)</Text>
      <SquircleShape
        style={{}}
        fillColor="black"
        backgroundColor="transparent"
        radius={100}
      />

      <Text>SquircleShaped (outer)</Text>
      <SquircleShape
        style={{}}
        fillColor={'transparent'}
        backgroundColor={'black'}
        radius={100}
      />

      <Text>SquircleSliderIcon</Text>
      <SquircleSliderIcon
        style={{}}
        borderColor={'white'}
        fillColor={'black'}
        arrowColor={'white'}
      />
    </SafeAreaView>
  );
};

export default App;
