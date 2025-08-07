import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const symptoms = [
    {
      id: 'pain',
      title: '疼痛評估',
      description: '評估手術部位的疼痛程度和性質',
      icon: 'pain',
      color: '#FF5722',
      route: 'Pain'
    },
    {
      id: 'sleep',
      title: '睡眠困難',
      description: '記錄睡眠品質和相關問題',
      icon: 'sleep',
      color: '#3F51B5',
      route: 'Sleep'
    },
    {
      id: 'tube',
      title: '管路問題',
      description: '氣切管、鼻胃管等管路相關問題',
      icon: 'tube',
      color: '#4CAF50',
      route: 'Tube'
    },
    {
      id: 'excretion',
      title: '排泄問題',
      description: '大小便相關的不適和問題',
      icon: 'excretion',
      color: '#FF9800',
      route: 'Excretion'
    }
  ];

  const getIcon = (iconName) => {
    const iconMap = {
      pain: 'emoticon-cry-outline',
      sleep: 'sleep',
      tube: 'medical-bag',
      excretion: 'toilet'
    };
    return iconMap[iconName] || 'help-circle';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>請選擇您要表達的主訴</Title>
        <Paragraph style={styles.subtitle}>
          點擊下方卡片來詳細描述您的症狀
        </Paragraph>
      </View>

      <View style={styles.cardContainer}>
        {symptoms.map((symptom) => (
          <Card
            key={symptom.id}
            style={[styles.card, { borderLeftColor: symptom.color }]}
            onPress={() => navigation.navigate(symptom.route)}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <IconButton
                  icon={getIcon(symptom.icon)}
                  size={32}
                  iconColor={symptom.color}
                  style={styles.icon}
                />
                <View style={styles.cardText}>
                  <Title style={styles.cardTitle}>{symptom.title}</Title>
                  <Paragraph style={styles.cardDescription}>
                    {symptom.description}
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Summary')}
          style={styles.summaryButton}
          icon="clipboard-text"
        >
          查看主訴總結
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
    elevation: 4,
    borderLeftWidth: 5,
  },
  cardContent: {
    paddingVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 0,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  buttonContainer: {
    padding: 20,
  },
  summaryButton: {
    marginTop: 10,
  },
}); 