import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useLanguage} from '../../context/LanguageContext';

interface ImportantDatesProps {
  registrationEnd?: string | Date;
  submissionStart?: string | Date;
  submissionEnd?: string | Date;
  resultDate?: string | Date;
}

const formatDate = (dateValue?: string | Date, tbaLabel = 'TBA') => {
  if (!dateValue) return {date: tbaLabel, time: ''};
  const d = new Date(dateValue);
  if (isNaN(d.getTime())) return {date: tbaLabel, time: ''};

  const day = d.getDate();
  const month = d.toLocaleDateString('en-IN', {month: 'short'});
  const year = String(d.getFullYear()).slice(-2);
  const time = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return {
    date: `${day} ${month} ${year}`,
    time,
  };
};

const ImportantDates: React.FC<ImportantDatesProps> = ({
  registrationEnd,
  submissionStart,
  submissionEnd,
  resultDate,
}) => {
  const {t} = useLanguage();
  const tbaText = t('tba');

  const regEnd = formatDate(registrationEnd, tbaText);
  const subStart = formatDate(submissionStart, tbaText);
  const subEnd = formatDate(submissionEnd, tbaText);
  const resDate = formatDate(resultDate, tbaText);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('importantDates')}</Text>

      <View style={styles.gridCard}>
        {/* Top Row */}
        <View style={styles.row}>
          {/* Register Before */}
          <View style={styles.cell}>
            <Text style={styles.icon}>📅</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>{t('registerBefore')}</Text>
              <Text style={styles.date}>{regEnd.date}</Text>
              {regEnd.time ? <Text style={styles.time}>{regEnd.time}</Text> : null}
            </View>
          </View>

          <View style={styles.verticalDivider} />

          {/* Submission Starts */}
          <View style={styles.cell}>
            <Text style={styles.icon}>✈</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>{t('submissionStarts')}</Text>
              <Text style={styles.date}>{subStart.date}</Text>
              {subStart.time ? <Text style={styles.time}>{subStart.time}</Text> : null}
            </View>
          </View>
        </View>

        <View style={styles.horizontalDivider} />

        {/* Bottom Row */}
        <View style={styles.row}>
          {/* Submission Ends */}
          <View style={styles.cell}>
            <Text style={styles.icon}>📤</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>{t('submissionEnds')}</Text>
              <Text style={styles.date}>{subEnd.date}</Text>
              {subEnd.time ? <Text style={styles.time}>{subEnd.time}</Text> : null}
            </View>
          </View>

          <View style={styles.verticalDivider} />

          {/* Result Date */}
          <View style={styles.cell}>
            <Text style={styles.icon}>🏆</Text>
            <View style={styles.cellContent}>
              <Text style={styles.label}>{t('resultDate')}</Text>
              <Text style={styles.date}>{resDate.date}</Text>
              {resDate.time ? <Text style={styles.time}>{resDate.time}</Text> : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ImportantDates);

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16232C',
    marginBottom: 8,
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEFEF',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
  },
  cellContent: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#7D8C94',
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007B8A',
  },
  time: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16232C',
    marginTop: 1,
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#EEF3F3',
    marginHorizontal: 10,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#EEF3F3',
    marginHorizontal: 12,
  },
});
