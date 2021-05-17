import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.timingContainer}>
      <RoundedButton
        style={{ marginRight: 25}}
        title='10'
        size={75}
        onPress={() => onChangeTime(10)}
      />
      <RoundedButton
        style={{ marginRight: 25 }}
        title='15'
        size={75}
        onPress={() => onChangeTime(15)}
      />
      <RoundedButton
        title='20'
        size={75}
        onPress={() => onChangeTime(20)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
