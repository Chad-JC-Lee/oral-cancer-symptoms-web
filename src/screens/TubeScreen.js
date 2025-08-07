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

export default function TubeScreen({ navigation }) {
  const [tubeType, setTubeType] = useState('');
  const [tubeProblems, setTubeProblems] = useState([]);
  const [tubeComfort, setTubeComfort] = useState('');
  const [tubeFunction, setTubeFunction] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const tubeTypes = [
    '氣切管',
    '鼻胃管',
    '導尿管',
    '引流管',
    '其他管路'
  ];

  const tubeProblemOptions = [
    '管路滑脫',
    '管路阻塞',
    '管路滲漏',
    '管路感染',
    '管路疼痛',
    '管路不適',
    '管路固定鬆動',
    '管路異味',
    '管路出血',
    '其他'
  ];

  const comfortLevels = [
    { label: '非常舒適', value: 'very-comfortable' },
    { label: '舒適', value: 'comfortable' },
    { label: '一般', value: 'moderate' },
    { label: '不適', value: 'uncomfortable' },
    { label: '非常不適', value: 'very-uncomfortable' }
  ];

  const functionOptions = [
    { label: '功能正常', value: 'normal' },
    { label: '輕微問題', value: 'minor-issue' },
    { label: '明顯問題', value: 'major-issue' },
    { label: '功能異常', value: 'dysfunctional' },
    { label: '完全無法使用', value: 'non-functional' }
  ];

  const toggleTubeProblem = (problem) => {
    if (tubeProblems.includes(problem)) {
      setTubeProblems(tubeProblems.filter(p => p !== problem));
    } else {
      setTubeProblems([...tubeProblems, problem]);
    }
  };

  const saveTubeData = () => {
    const tubeData = {
      type: tubeType,
      problems: tubeProblems,
      comfort: tubeComfort,
      function: tubeFunction,
      notes: additionalNotes
    };
    
    dataManager.saveTubeData(tubeData);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>管路類型</Title>
          <Paragraph style={styles.description}>
            請選擇您目前使用的管路類型
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setTubeType(value)} value={tubeType}>
            {tubeTypes.map((type) => (
              <RadioButton.Item
                key={type}
                label={type}
                value={type}
                style={styles.radioItem}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>管路問題</Title>
          <Paragraph style={styles.description}>
            請選擇您遇到的管路問題（可多選）
          </Paragraph>
          
          <View style={styles.checkboxContainer}>
            {tubeProblemOptions.map((problem) => (
              <Checkbox.Item
                key={problem}
                label={problem}
                status={tubeProblems.includes(problem) ? 'checked' : 'unchecked'}
                onPress={() => toggleTubeProblem(problem)}
                style={styles.checkboxItem}
              />
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>管路舒適度</Title>
          <Paragraph style={styles.description}>
            請評估管路對您造成的舒適程度
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setTubeComfort(value)} value={tubeComfort}>
            {comfortLevels.map((level) => (
              <RadioButton.Item
                key={level.value}
                label={level.label}
                value={level.value}
                style={styles.radioItem}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>管路功能</Title>
          <Paragraph style={styles.description}>
            請評估管路的功能狀況
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setTubeFunction(value)} value={tubeFunction}>
            {functionOptions.map((option) => (
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
          <Title style={styles.sectionTitle}>管路護理需求</Title>
          <Paragraph style={styles.description}>
            請描述您對管路護理的特殊需求
          </Paragraph>
          
          <View style={styles.chipContainer}>
            {[
              '需要更換固定',
              '需要清潔',
              '需要調整位置',
              '需要更換管路',
              '需要止痛',
              '其他'
            ].map((need) => (
              <Chip
                key={need}
                selected={additionalNotes.includes(need)}
                onPress={() => {
                  if (additionalNotes.includes(need)) {
                    setAdditionalNotes(additionalNotes.replace(need + '、', '').replace('、' + need, '').replace(need, ''));
                  } else {
                    setAdditionalNotes(additionalNotes + (additionalNotes ? '、' : '') + need);
                  }
                }}
                style={styles.chip}
                mode="outlined"
              >
                {need}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>其他說明</Title>
          <TextInput
            label="請描述其他管路相關問題"
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
          onPress={saveTubeData}
          style={styles.saveButton}
          icon="content-save"
        >
          保存管路評估
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
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