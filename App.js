import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: `${focusHistory.length + 1}`, subject, status },
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      const data = JSON.parse(history);
      if (history && data.length) {
        setFocusHistory(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimeEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUES.COMPLETE);
            setFocusSubject(null);
          }}
          cancelledSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
