import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  List,
  Divider,
  Chip
} from 'react-native-paper';
import dataManager from '../utils/DataManager';

export default function SummaryScreen({ navigation }) {
  const [summaryData, setSummaryData] = useState({
    pain: null,
    sleep: null,
    tube: null,
    excretion: null
  });

  // 從數據管理器獲取數據
  useEffect(() => {
    const data = dataManager.getAllData();
    setSummaryData(data);
  }, []);

  const getPainLevelText = (level) => {
    const levelMap = {
      '0': '無疼痛',
      '1-3': '輕微疼痛',
      '4-6': '中度疼痛',
      '7-9': '嚴重疼痛',
      '10': '極度疼痛'
    };
    return levelMap[level] || level;
  };

  const getSleepQualityText = (quality) => {
    const qualityMap = {
      'excellent': '非常好',
      'good': '良好',
      'fair': '一般',
      'poor': '差',
      'very-poor': '很差'
    };
    return qualityMap[quality] || quality;
  };

  const getComfortText = (comfort) => {
    const comfortMap = {
      'very-comfortable': '非常舒適',
      'comfortable': '舒適',
      'moderate': '一般',
      'uncomfortable': '不適',
      'very-uncomfortable': '非常不適'
    };
    return comfortMap[comfort] || comfort;
  };

  const getFrequencyText = (frequency) => {
    const frequencyMap = {
      'normal': '正常',
      'increased': '增加',
      'decreased': '減少',
      'irregular': '不規律',
      'uncontrollable': '無法控制'
    };
    return frequencyMap[frequency] || frequency;
  };

  const renderPainSummary = () => {
    if (!summaryData.pain) return null;
    
    return (
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>疼痛評估</Title>
          <List.Item
            title="疼痛程度"
            description={getPainLevelText(summaryData.pain.level)}
            left={props => <List.Icon {...props} icon="emoticon-cry-outline" />}
          />
          <List.Item
            title="疼痛位置"
            description={summaryData.pain.location}
            left={props => <List.Icon {...props} icon="map-marker" />}
          />
          <List.Item
            title="疼痛性質"
            description={summaryData.pain.type}
            left={props => <List.Icon {...props} icon="heart-pulse" />}
          />
          <List.Item
            title="持續時間"
            description={summaryData.pain.duration}
            left={props => <List.Icon {...props} icon="clock" />}
          />
          {summaryData.pain.notes && (
            <List.Item
              title="其他說明"
              description={summaryData.pain.notes}
              left={props => <List.Icon {...props} icon="note-text" />}
            />
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderSleepSummary = () => {
    if (!summaryData.sleep) return null;
    
    return (
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>睡眠評估</Title>
          <List.Item
            title="睡眠品質"
            description={getSleepQualityText(summaryData.sleep.quality)}
            left={props => <List.Icon {...props} icon="sleep" />}
          />
          <List.Item
            title="睡眠時間"
            description={summaryData.sleep.hours}
            left={props => <List.Icon {...props} icon="timer" />}
          />
          <List.Item
            title="睡眠問題"
            description={summaryData.sleep.problems.join('、')}
            left={props => <List.Icon {...props} icon="alert-circle" />}
          />
          <List.Item
            title="中斷次數"
            description={summaryData.sleep.interruptions}
            left={props => <List.Icon {...props} icon="wake" />}
          />
          {summaryData.sleep.notes && (
            <List.Item
              title="其他說明"
              description={summaryData.sleep.notes}
              left={props => <List.Icon {...props} icon="note-text" />}
            />
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderTubeSummary = () => {
    if (!summaryData.tube) return null;
    
    return (
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>管路評估</Title>
          <List.Item
            title="管路類型"
            description={summaryData.tube.type}
            left={props => <List.Icon {...props} icon="medical-bag" />}
          />
          <List.Item
            title="管路問題"
            description={summaryData.tube.problems.join('、')}
            left={props => <List.Icon {...props} icon="alert-circle" />}
          />
          <List.Item
            title="舒適度"
            description={getComfortText(summaryData.tube.comfort)}
            left={props => <List.Icon {...props} icon="comfort" />}
          />
          <List.Item
            title="功能狀況"
            description={summaryData.tube.function}
            left={props => <List.Icon {...props} icon="check-circle" />}
          />
          {summaryData.tube.notes && (
            <List.Item
              title="其他說明"
              description={summaryData.tube.notes}
              left={props => <List.Icon {...props} icon="note-text" />}
            />
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderExcretionSummary = () => {
    if (!summaryData.excretion) return null;
    
    return (
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>排泄評估</Title>
          <List.Item
            title="排尿問題"
            description={summaryData.excretion.urinationProblems.join('、')}
            left={props => <List.Icon {...props} icon="toilet" />}
          />
          <List.Item
            title="排尿頻率"
            description={getFrequencyText(summaryData.excretion.urinationFrequency)}
            left={props => <List.Icon {...props} icon="timer" />}
          />
          <List.Item
            title="排便問題"
            description={summaryData.excretion.bowelProblems.join('、')}
            left={props => <List.Icon {...props} icon="toilet" />}
          />
          <List.Item
            title="排便頻率"
            description={getFrequencyText(summaryData.excretion.bowelFrequency)}
            left={props => <List.Icon {...props} icon="timer" />}
          />
          {summaryData.excretion.notes && (
            <List.Item
              title="其他說明"
              description={summaryData.excretion.notes}
              left={props => <List.Icon {...props} icon="note-text" />}
            />
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>主訴總結</Title>
        <Paragraph style={styles.subtitle}>
          以下是您填寫的所有主訴內容總結
        </Paragraph>
      </View>

      {renderPainSummary()}
      {renderSleepSummary()}
      {renderTubeSummary()}
      {renderExcretionSummary()}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
          icon="home"
        >
          返回首頁
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            // 這裡可以實現分享或導出功能
            console.log('分享主訴總結');
          }}
          style={styles.button}
          icon="share"
        >
          分享總結
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  summaryCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2196F3',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 32,
  },
  button: {
    marginTop: 8,
  },
}); 