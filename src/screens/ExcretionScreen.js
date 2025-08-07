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

export default function ExcretionScreen({ navigation }) {
  const [urinationProblems, setUrinationProblems] = useState([]);
  const [bowelProblems, setBowelProblems] = useState([]);
  const [urinationFrequency, setUrinationFrequency] = useState('');
  const [bowelFrequency, setBowelFrequency] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const urinationProblemOptions = [
    '排尿困難',
    '排尿疼痛',
    '頻尿',
    '夜尿',
    '尿急',
    '尿失禁',
    '尿量減少',
    '尿液混濁',
    '血尿',
    '其他'
  ];

  const bowelProblemOptions = [
    '便秘',
    '腹瀉',
    '排便疼痛',
    '排便困難',
    '腹脹',
    '腹痛',
    '排便不規律',
    '大便失禁',
    '血便',
    '其他'
  ];

  const frequencyOptions = [
    { label: '正常', value: 'normal' },
    { label: '增加', value: 'increased' },
    { label: '減少', value: 'decreased' },
    { label: '不規律', value: 'irregular' },
    { label: '無法控制', value: 'uncontrollable' }
  ];

  const toggleUrinationProblem = (problem) => {
    if (urinationProblems.includes(problem)) {
      setUrinationProblems(urinationProblems.filter(p => p !== problem));
    } else {
      setUrinationProblems([...urinationProblems, problem]);
    }
  };

  const toggleBowelProblem = (problem) => {
    if (bowelProblems.includes(problem)) {
      setBowelProblems(bowelProblems.filter(p => p !== problem));
    } else {
      setBowelProblems([...bowelProblems, problem]);
    }
  };

  const saveExcretionData = () => {
    const excretionData = {
      urinationProblems,
      bowelProblems,
      urinationFrequency,
      bowelFrequency,
      notes: additionalNotes
    };
    
    dataManager.saveExcretionData(excretionData);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>排尿問題</Title>
          <Paragraph style={styles.description}>
            請選擇您遇到的排尿問題（可多選）
          </Paragraph>
          
          <View style={styles.checkboxContainer}>
            {urinationProblemOptions.map((problem) => (
              <Checkbox.Item
                key={problem}
                label={problem}
                status={urinationProblems.includes(problem) ? 'checked' : 'unchecked'}
                onPress={() => toggleUrinationProblem(problem)}
                style={styles.checkboxItem}
              />
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>排尿頻率</Title>
          <Paragraph style={styles.description}>
            請評估您的排尿頻率
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setUrinationFrequency(value)} value={urinationFrequency}>
            {frequencyOptions.map((option) => (
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
          <Title style={styles.sectionTitle}>排便問題</Title>
          <Paragraph style={styles.description}>
            請選擇您遇到的排便問題（可多選）
          </Paragraph>
          
          <View style={styles.checkboxContainer}>
            {bowelProblemOptions.map((problem) => (
              <Checkbox.Item
                key={problem}
                label={problem}
                status={bowelProblems.includes(problem) ? 'checked' : 'unchecked'}
                onPress={() => toggleBowelProblem(problem)}
                style={styles.checkboxItem}
              />
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>排便頻率</Title>
          <Paragraph style={styles.description}>
            請評估您的排便頻率
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setBowelFrequency(value)} value={bowelFrequency}>
            {frequencyOptions.map((option) => (
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
          <Title style={styles.sectionTitle}>飲食影響</Title>
          <Paragraph style={styles.description}>
            請描述飲食對排泄的影響
          </Paragraph>
          
          <View style={styles.chipContainer}>
            {[
              '進食後腹脹',
              '進食後腹瀉',
              '進食後便秘',
              '食慾不振',
              '噁心嘔吐',
              '其他'
            ].map((effect) => (
              <Chip
                key={effect}
                selected={additionalNotes.includes(effect)}
                onPress={() => {
                  if (additionalNotes.includes(effect)) {
                    setAdditionalNotes(additionalNotes.replace(effect + '、', '').replace('、' + effect, '').replace(effect, ''));
                  } else {
                    setAdditionalNotes(additionalNotes + (additionalNotes ? '、' : '') + effect);
                  }
                }}
                style={styles.chip}
                mode="outlined"
              >
                {effect}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>其他說明</Title>
          <TextInput
            label="請描述其他排泄相關問題"
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
          onPress={saveExcretionData}
          style={styles.saveButton}
          icon="content-save"
        >
          保存排泄評估
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