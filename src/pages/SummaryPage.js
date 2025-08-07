import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Home as HomeIcon,
  Share as ShareIcon,
  SentimentVeryDissatisfied as PainIcon,
  Bedtime as SleepIcon,
  MedicalServices as TubeIcon,
  Wc as ExcretionIcon,
  Assessment as SummaryIcon
} from '@mui/icons-material';

const SummaryPage = () => {
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState({
    pain: null,
    sleep: null,
    tube: null,
    excretion: null
  });

  useEffect(() => {
    // 從localStorage載入數據
    const painData = localStorage.getItem('painData');
    const sleepData = localStorage.getItem('sleepData');
    const tubeData = localStorage.getItem('tubeData');
    const excretionData = localStorage.getItem('excretionData');

    setSummaryData({
      pain: painData ? JSON.parse(painData) : null,
      sleep: sleepData ? JSON.parse(sleepData) : null,
      tube: tubeData ? JSON.parse(tubeData) : null,
      excretion: excretionData ? JSON.parse(excretionData) : null
    });
  }, []);

  const getPainLevelText = (level) => {
    if (level === 0) return '無疼痛';
    if (level <= 3) return '輕微疼痛';
    if (level <= 6) return '中度疼痛';
    if (level <= 8) return '嚴重疼痛';
    return '極度疼痛';
  };

  const renderPainSummary = () => {
    if (!summaryData.pain) return null;
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PainIcon sx={{ fontSize: 32, color: '#FF5722', mr: 2 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#FF5722' }}>
              疼痛評估
            </Typography>
          </Box>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <PainIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="疼痛程度" 
                secondary={`${summaryData.pain.level}/10 - ${getPainLevelText(summaryData.pain.level)}`}
              />
            </ListItem>
            {summaryData.pain.location && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="疼痛位置" 
                  secondary={summaryData.pain.location}
                />
              </ListItem>
            )}
            {summaryData.pain.type && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="疼痛性質" 
                  secondary={summaryData.pain.type}
                />
              </ListItem>
            )}
            {summaryData.pain.duration && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="疼痛特徵" 
                  secondary={summaryData.pain.duration}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    );
  };

  const renderSleepSummary = () => {
    if (!summaryData.sleep) return null;
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SleepIcon sx={{ fontSize: 32, color: '#3F51B5', mr: 2 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#3F51B5' }}>
              睡眠評估
            </Typography>
          </Box>
          
          <List>
            {summaryData.sleep.hours && (
              <ListItem>
                <ListItemIcon>
                  <SleepIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="睡眠時間" 
                  secondary={summaryData.sleep.hours}
                />
              </ListItem>
            )}
            {summaryData.sleep.problems && summaryData.sleep.problems.length > 0 && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="睡眠問題" 
                  secondary={summaryData.sleep.problems.join('、')}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    );
  };

  const renderTubeSummary = () => {
    if (!summaryData.tube) return null;
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TubeIcon sx={{ fontSize: 32, color: '#4CAF50', mr: 2 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
              管路評估
            </Typography>
          </Box>
          
          <List>
            {summaryData.tube.type && (
              <ListItem>
                <ListItemIcon>
                  <TubeIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="管路類型" 
                  secondary={summaryData.tube.type}
                />
              </ListItem>
            )}
            {summaryData.tube.problems && summaryData.tube.problems.length > 0 && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="管路問題" 
                  secondary={summaryData.tube.problems.join('、')}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    );
  };

  const renderExcretionSummary = () => {
    if (!summaryData.excretion) return null;
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ExcretionIcon sx={{ fontSize: 32, color: '#FF9800', mr: 2 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
              排泄評估
            </Typography>
          </Box>
          
          <List>
            {summaryData.excretion.type && (
              <ListItem>
                <ListItemIcon>
                  <ExcretionIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="排泄類型" 
                  secondary={summaryData.excretion.type}
                />
              </ListItem>
            )}
            
            {summaryData.excretion.type === '排尿問題' && summaryData.excretion.urinationProblems && summaryData.excretion.urinationProblems.length > 0 && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="排尿問題" 
                  secondary={summaryData.excretion.urinationProblems.join('、')}
                />
              </ListItem>
            )}
            
            {summaryData.excretion.type === '排便問題' && summaryData.excretion.bowelProblems && summaryData.excretion.bowelProblems.length > 0 && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="排便問題" 
                  secondary={summaryData.excretion.bowelProblems.join('、')}
                />
              </ListItem>
            )}
            
            {summaryData.excretion.constipationDays && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="便秘天數" 
                  secondary={summaryData.excretion.constipationDays}
                />
              </ListItem>
            )}
            
            {summaryData.excretion.diarrheaTimes && (
              <ListItem>
                <ListItemIcon>
                  <SummaryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="腹瀉次數" 
                  secondary={summaryData.excretion.diarrheaTimes}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    );
  };

  const hasData = Object.values(summaryData).some(data => data !== null);

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate('/')}
            sx={{ color: 'white', mr: 2 }}
          >
            返回
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            主訴總結
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          以下是您填寫的所有主訴內容總結
        </Typography>
      </Paper>

      {!hasData ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          目前還沒有任何評估數據。請先填寫相關的主訴內容。
        </Alert>
      ) : (
        <>
          {renderPainSummary()}
          {renderSleepSummary()}
          {renderTubeSummary()}
          {renderExcretionSummary()}
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          startIcon={<HomeIcon />}
          sx={{ px: 4, py: 2, fontSize: '1.1rem' }}
        >
          返回首頁
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            // 這裡可以實現分享功能
            console.log('分享主訴總結');
          }}
          startIcon={<ShareIcon />}
          sx={{ px: 4, py: 2, fontSize: '1.1rem' }}
        >
          分享總結
        </Button>
      </Box>
    </Box>
  );
};

export default SummaryPage; 