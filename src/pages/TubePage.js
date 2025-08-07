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

const TubePage = () => {
  const navigate = useNavigate();
  const [tubeType, setTubeType] = useState('');
  const [tubeProblems, setTubeProblems] = useState([]);

  const tubeTypes = [
    '氣切管',
    '鼻胃管',
    '導尿管',
    '引流管'
  ];

  const tubeProblemOptions = [
    '管路滑脫',
    '管路阻塞',
    '管路滲漏',
    '管路疼痛',
    '管路出血',
    '想知道移除管路時間'
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
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('tubeData', JSON.stringify(tubeData));
  };

  const handleNext = () => {
    saveTubeData();
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
            管路問題評估
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          請評估您的管路狀況
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* 管路類型 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                管路類型
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請選擇您目前使用的管路類型
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {tubeTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    onClick={() => setTubeType(type)}
                    color={tubeType === type ? 'primary' : 'default'}
                    variant={tubeType === type ? 'filled' : 'outlined'}
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

        {/* 管路問題 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                管路問題
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請選擇您遇到的管路問題（可多選）
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {tubeProblemOptions.map((problem) => (
                  <Chip
                    key={problem}
                    label={problem}
                    onClick={() => toggleTubeProblem(problem)}
                    color={tubeProblems.includes(problem) ? 'primary' : 'default'}
                    variant={tubeProblems.includes(problem) ? 'filled' : 'outlined'}
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

export default TubePage; 