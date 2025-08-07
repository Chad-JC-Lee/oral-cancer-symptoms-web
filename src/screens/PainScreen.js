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
  Divider
} from 'react-native-paper';
import dataManager from '../utils/DataManager';

export default function PainScreen({ navigation }) {
  const [painLevel, setPainLevel] = useState('');
  const [painLocation, setPainLocation] = useState('');
  const [painType, setPainType] = useState('');
  const [painDuration, setPainDuration] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const painLevels = [
    { label: '無疼痛', value: '0' },
    { label: '輕微疼痛', value: '1-3' },
    { label: '中度疼痛', value: '4-6' },
    { label: '嚴重疼痛', value: '7-9' },
    { label: '極度疼痛', value: '10' }
  ];

  const painLocations = [
    '手術部位',
    '頸部',
    '臉部',
    '頭部',
    '胸部',
    '腹部',
    '其他'
  ];

  const painTypes = [
    '刺痛',
    '鈍痛',
    '抽痛',
    '灼熱痛',
    '壓迫痛',
    '跳痛',
    '其他'
  ];

  const durations = [
    '持續性',
    '間歇性',
    '活動時加重',
    '休息時加重',
    '進食時加重',
    '其他'
  ];

  const savePainData = () => {
    const painData = {
      level: painLevel,
      location: painLocation,
      type: painType,
      duration: painDuration,
      notes: additionalNotes
    };
    
    dataManager.savePainData(painData);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>疼痛程度評估</Title>
          <Paragraph style={styles.description}>
            請選擇最能描述您目前疼痛程度的選項
          </Paragraph>
          
          <RadioButton.Group onValueChange={value => setPainLevel(value)} value={painLevel}>
            {painLevels.map((level) => (
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
          <Title style={styles.sectionTitle}>疼痛位置</Title>
          <Paragraph style={styles.description}>
            請選擇疼痛的主要位置
          </Paragraph>
          
          <View style={styles.chipContainer}>
            {painLocations.map((location) => (
              <Chip
                key={location}
                selected={painLocation === location}
                onPress={() => setPainLocation(location)}
                style={styles.chip}
                mode="outlined"
              >
                {location}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>疼痛性質</Title>
          <Paragraph style={styles.description}>
            請描述疼痛的感覺
          </Paragraph>
          
          <View style={styles.chipContainer}>
            {painTypes.map((type) => (
              <Chip
                key={type}
                selected={painType === type}
                onPress={() => setPainType(type)}
                style={styles.chip}
                mode="outlined"
              >
                {type}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>疼痛持續時間</Title>
          <Paragraph style={styles.description}>
            請描述疼痛的時間特徵
          </Paragraph>
          
          <View style={styles.chipContainer}>
            {durations.map((duration) => (
              <Chip
                key={duration}
                selected={painDuration === duration}
                onPress={() => setPainDuration(duration)}
                style={styles.chip}
                mode="outlined"
              >
                {duration}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>其他說明</Title>
          <TextInput
            label="請描述其他疼痛相關症狀"
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
          onPress={savePainData}
          style={styles.saveButton}
          icon="content-save"
        >
          保存疼痛評估
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