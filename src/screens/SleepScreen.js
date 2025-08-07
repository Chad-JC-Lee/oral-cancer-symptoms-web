import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  RadioButton, 
  TextInput,
  Chip,
  Checkbox
} from 'react-native-paper';
import dataManager from '../utils/DataManager';

export default function SleepScreen({ navigation }) {
  const [sleepQuality, setSleepQuality] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepProblems, setSleepProblems] = useState([]);
  const [sleepInterruptions, setSleepInterruptions] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const sleepQualityOptions = [
    { label: '非常好', value: 'excellent' },
    { label: '良好', value: 'good' },
    { label: '一般', value: 'fair' },
    { label: '差', value: 'poor' },
    { label: '很差', value: 'very-poor' }
  ];

  const sleepHoursOptions = [
    { label: '少於4小時', value: '<4' },
    { label: '4-6小時', value: '4-6' },
    { label: '6-8小時', value: '6-8' },
    { label: '8-10小時', value: '8-10' },
    { label: '超過10小時', value: '>10' }
  ];

  const sleepProblemOptions = [
    '入睡困難',
    '容易醒來',
    '睡眠中斷',
    '早醒',
    '多夢',
    '惡夢',
    '呼吸困難',
    '疼痛影響睡眠',
    '管路不適',
    '其他'
  ];

  const interruptionOptions = [
    '無中斷',
    '1-2次',
    '3-5次',
    '超過5次',
    '整夜無法入睡'
  ];

  const toggleSleepProblem = (problem) => {
    if (sleepProblems.includes(problem)) {
      setSleepProblems(sleepProblems.filter(p => p !== problem));
    } else {
      setSleepProblems([...sleepProblems, problem]);
    }
  };

  const saveSleepData = () => {
    const sleepData = {
      quality: sleepQuality,
      hours: sleepHours,
      problems: sleepProblems,
      interruptions: sleepInterruptions,
      notes: additionalNotes
    };
    
    dataManager.saveSleepData(sleepData);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>睡眠品質評估</Title>
          <Paragraph style={styles.description}>
            請評估您昨晚的睡眠品質
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setSleepQuality(value)} value={sleepQuality}>
            {sleepQualityOptions.map((option) => (
              <RadioButton.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={styles.radioItem}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>睡眠時間</Title>
          <Paragraph style={styles.description}>
            請選擇您昨晚的實際睡眠時間
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setSleepHours(value)} value={sleepHours}>
            {sleepHoursOptions.map((option) => (
              <RadioButton.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={styles.radioItem}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>睡眠問題</Title>
          <Paragraph style={styles.description}>
            請選擇您遇到的睡眠問題（可多選）
          </Paragraph>
          
          <View style={styles.checkboxContainer}>
            {sleepProblemOptions.map((problem) => (
              <Checkbox.Item
                key={problem}
                label={problem}
                status={sleepProblems.includes(problem) ? 'checked' : 'unchecked'}
                onPress={() => toggleSleepProblem(problem)}
                style={styles.checkboxItem}
              />
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>睡眠中斷次數</Title>
          <Paragraph style={styles.description}>
            請選擇您昨晚醒來的次數
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setSleepInterruptions(value)} value={sleepInterruptions}>
            {interruptionOptions.map((option) => (
              <RadioButton.Item
                key={option}
                label={option}
                value={option}
                style={styles.radioItem}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>其他說明</Title>
          <TextInput
            label="請描述其他睡眠相關問題"
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            multiline
            numberOfLines={4}
            mode="outlined"
            style={styles.textInput}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={saveSleepData}
          style={styles.saveButton}
          icon="content-save"
        >
          保存睡眠評估
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  radioItem: {
    paddingVertical: 4,
  },
  checkboxContainer: {
    marginTop: 8,
  },
  checkboxItem: {
    paddingVertical: 2,
  },
  textInput: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  saveButton: {
    marginTop: 8,
  },
}); 