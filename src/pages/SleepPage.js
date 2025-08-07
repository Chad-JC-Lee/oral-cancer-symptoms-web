import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Chip,
  Paper,
  Grid,
  Checkbox,
  FormGroup
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  ArrowForward as NextIcon
} from '@mui/icons-material';

const SleepPage = () => {
  const navigate = useNavigate();
  const [sleepHours, setSleepHours] = useState('');
  const [sleepProblems, setSleepProblems] = useState([]);

  const sleepHoursOptions = [
    '少於4小時',
    '4-6小時',
    '6-8小時',
    '8-10小時',
    '超過10小時'
  ];

  const sleepProblemOptions = [
    '入睡困難',
    '容易醒來',
    '淺眠',
    '疼痛影響睡眠',
    '焦慮影響睡眠',
    '環境影響睡眠'
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
      hours: sleepHours,
      problems: sleepProblems,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('sleepData', JSON.stringify(sleepData));
  };

  const handleNext = () => {
    saveSleepData();
    navigate('/summary');
  };

  const handleBack = () => {
    navigate('/');
  };

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
            睡眠困難評估
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          請評估您的睡眠狀況
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* 睡眠時間 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                睡眠時間
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請選擇您昨晚的實際睡眠時間
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {sleepHoursOptions.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    onClick={() => setSleepHours(option)}
                    color={sleepHours === option ? 'primary' : 'default'}
                    variant={sleepHours === option ? 'filled' : 'outlined'}
                    sx={{ 
                      fontSize: '1.2rem',
                      padding: '16px 20px',
                      height: 'auto',
                      minHeight: '56px',
                      fontWeight: 'bold',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 睡眠問題 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                睡眠問題
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請選擇您遇到的睡眠問題（可多選）
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {sleepProblemOptions.map((problem) => (
                  <Chip
                    key={problem}
                    label={problem}
                    onClick={() => toggleSleepProblem(problem)}
                    color={sleepProblems.includes(problem) ? 'primary' : 'default'}
                    variant={sleepProblems.includes(problem) ? 'filled' : 'outlined'}
                    sx={{ 
                      fontSize: '1.2rem',
                      padding: '16px 20px',
                      height: 'auto',
                      minHeight: '56px',
                      fontWeight: 'bold',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 按鈕區域 */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleBack}
              startIcon={<BackIcon />}
              sx={{ 
                px: 6, 
                py: 3, 
                fontSize: '1.3rem',
                minHeight: '64px',
                fontWeight: 'bold',
                borderRadius: '12px',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease'
              }}
            >
              回到上一步
            </Button>
            
            <Button
              variant="contained"
              size="large"
              onClick={handleNext}
              endIcon={<NextIcon />}
              sx={{ 
                px: 6, 
                py: 3, 
                fontSize: '1.3rem',
                minHeight: '64px',
                fontWeight: 'bold',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease'
              }}
            >
              下一步
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SleepPage; 