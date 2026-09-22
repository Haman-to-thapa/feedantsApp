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
    <View style={styles.banner}>
      <View style={styles.leftGroup}>
        <Text style={styles.hourglassIcon}>⌛</Text>
        <Text style={styles.label}>Registration closes in</Text>
      </View>

      <Text style={styles.timerValue}>
        {format(days)}d : {format(hours)}h : {format(minutes)}m : {format(seconds)}s
      </Text>

      <View style={styles.rightGroup}>
        <Text style={styles.hurryText}>⏱ Hurry up!</Text>
      </View>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  banner: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: '#EBF6F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourglassIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16232C',
  },
  timerValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007B8A',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hurryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007B8A',
  },
});
