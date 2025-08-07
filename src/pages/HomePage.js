import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Button,
  Paper
} from '@mui/material';
import {
  SentimentVeryDissatisfied as PainIcon,
  Bedtime as SleepIcon,
  MedicalServices as TubeIcon,
  Wc as ExcretionIcon,
  Assessment as SummaryIcon
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();

  const symptoms = [
    {
      id: 'pain',
      title: '疼痛評估',
      description: '評估手術部位的疼痛程度和性質',
      icon: <PainIcon sx={{ fontSize: 40, color: '#FF5722' }} />,
      color: '#FF5722',
      path: '/pain'
    },
    {
      id: 'sleep',
      title: '睡眠困難',
      description: '記錄睡眠品質和相關問題',
      icon: <SleepIcon sx={{ fontSize: 40, color: '#3F51B5' }} />,
      color: '#3F51B5',
      path: '/sleep'
    },
    {
      id: 'tube',
      title: '管路問題',
      description: '氣切管、鼻胃管等管路相關問題',
      icon: <TubeIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#4CAF50',
      path: '/tube'
    },
    {
      id: 'excretion',
      title: '排泄問題',
      description: '大小便相關的不適和問題',
      icon: <ExcretionIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FF9800',
      path: '/excretion'
    }
  ];

  return (
    <Box>
      {/* 標題區域 */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          口腔癌術後主訴表達
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          請選擇您要表達的主訴類型
        </Typography>
      </Paper>

      {/* 主訴選項 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {symptoms.map((symptom) => (
          <Grid item xs={12} sm={6} key={symptom.id}>
            <Card 
              sx={{ 
                height: '100%',
                borderLeft: `5px solid ${symptom.color}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}
            >
              <CardActionArea 
                onClick={() => navigate(symptom.path)}
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {symptom.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {symptom.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {symptom.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 總結按鈕 */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/summary')}
          startIcon={<SummaryIcon />}
          sx={{ 
            px: 4, 
            py: 2, 
            fontSize: '1.1rem',
            backgroundColor: 'secondary.main',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            }
          }}
        >
          查看主訴總結
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage; 