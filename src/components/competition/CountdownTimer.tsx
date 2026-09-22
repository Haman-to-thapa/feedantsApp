import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CountdownTimerProps {
  targetDate?: string | Date | number;
  initialDurationMs?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  initialDurationMs = 1 * 24 * 60 * 60 * 1000 +
    6 * 60 * 60 * 1000 +
    28 * 60 * 1000 +
    32 * 1000,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const d = targetDate ? new Date(targetDate).getTime() : 0;
    const deadline = !isNaN(d) && d > 0 ? d : Date.now() + initialDurationMs;
    return Math.max(0, deadline - Date.now());
  });

  useEffect(() => {
    const d = targetDate ? new Date(targetDate).getTime() : 0;
    const deadline = !isNaN(d) && d > 0 ? d : Date.now() + initialDurationMs;

    const updateCountdown = () => {
      const remaining = Math.max(0, deadline - Date.now());
      setTimeLeft(remaining);
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate, initialDurationMs]);

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const format = (v: number) => String(v).padStart(2, '0');

  const isClosed = timeLeft <= 0;

  return (
    <View style={styles.banner}>
      <View style={styles.leftGroup}>
        <Text style={styles.hourglassIcon}>⌛</Text>
        <Text style={styles.label}>
          {isClosed ? 'Registration ended' : 'Registration closes in'}
        </Text>
      </View>

      <Text style={[styles.timerValue, isClosed && styles.timerClosed]}>
        {isClosed
          ? '00d : 00h : 00m : 00s'
          : `${format(days)}d : ${format(hours)}h : ${format(minutes)}m : ${format(seconds)}s`}
      </Text>

      <View style={styles.rightGroup}>
        <Text style={[styles.hurryText, isClosed && styles.closedText]}>
          {isClosed ? 'Closed' : '⏱ Hurry up!'}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(CountdownTimer);

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
  timerClosed: {
    color: '#839299',
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
  closedText: {
    color: '#839299',
  },
});
