import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CountdownTimerProps {
  initialDurationMs?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialDurationMs = 1 * 24 * 60 * 60 * 1000 +
    6 * 60 * 60 * 1000 +
    28 * 60 * 1000 +
    32 * 1000,
}) => {
  const deadline = useRef(Date.now() + initialDurationMs).current;
  const [timeLeft, setTimeLeft] = useState(deadline - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(deadline - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const format = (v: number) => String(v).padStart(2, '0');

  return (
    <View style={styles.countdownCard}>
      <Text style={styles.countdownIcon}>⌛</Text>

      <Text style={styles.countdownLabel}>Registration closes in</Text>

      <Text style={styles.countdownValue}>
        {format(days)}d : {format(hours)}h : {format(minutes)}m : {format(seconds)}s
      </Text>

      <Text style={styles.hurryText}>⏱ Hurry up!</Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  countdownCard: {
    marginTop: 12,
    minHeight: 52,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#EAF7F7',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 4,
  },
  countdownIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  countdownLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#162A45',
    marginRight: 10,
  },
  countdownValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#087C84',
    minWidth: 150,
  },
  hurryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#167C80',
  },
});
