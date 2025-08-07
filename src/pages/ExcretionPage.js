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

const ExcretionPage = () => {
  const navigate = useNavigate();
  const [excretionType, setExcretionType] = useState('');
  const [urinationProblems, setUrinationProblems] = useState([]);
  const [bowelProblems, setBowelProblems] = useState([]);
  const [constipationDays, setConstipationDays] = useState('');
  const [diarrheaTimes, setDiarrheaTimes] = useState('');

  const excretionTypes = [
    '排尿問題',
    '排便問題'
  ];

  const urinationProblemOptions = [
    '排尿困難',
    '血尿',
    '尿量減少',
    '頻尿'
  ];

  const bowelProblemOptions = [
    '便秘',
    '腹瀉',
    '血便',
    '腹脹'
  ];

  const constipationDayOptions = [
    '1-2天',
    '3-5天',
    '6-7天',
    '超過7天'
  ];

  const diarrheaTimeOptions = [
    '1-2次',
    '3-5次',
    '6-10次',
    '超過10次'
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
      type: excretionType,
      urinationProblems: excretionType === '排尿問題' ? urinationProblems : [],
      bowelProblems: excretionType === '排便問題' ? bowelProblems : [],
      constipationDays: bowelProblems.includes('便秘') ? constipationDays : '',
      diarrheaTimes: bowelProblems.includes('腹瀉') ? diarrheaTimes : '',
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('excretionData', JSON.stringify(excretionData));
  };

  const handleNext = () => {
    saveExcretionData();
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
            排泄問題評估
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          請評估您的排泄狀況
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* 排泄類型選擇 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                排泄類型
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請選擇您要評估的排泄問題類型
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {excretionTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    onClick={() => setExcretionType(type)}
                    color={excretionType === type ? 'primary' : 'default'}
                    variant={excretionType === type ? 'filled' : 'outlined'}
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

        {/* 排尿問題 */}
        {excretionType === '排尿問題' && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                  排尿問題
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                  請選擇您遇到的排尿問題（可多選）
                </Typography>
                
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 2,
                  maxWidth: 800,
                  mx: 'auto'
                }}>
                  {urinationProblemOptions.map((problem) => (
                    <Chip
                      key={problem}
                      label={problem}
                      onClick={() => toggleUrinationProblem(problem)}
                      color={urinationProblems.includes(problem) ? 'primary' : 'default'}
                      variant={urinationProblems.includes(problem) ? 'filled' : 'outlined'}
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
        )}

        {/* 排便問題 */}
        {excretionType === '排便問題' && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                  排便問題
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                  請選擇您遇到的排便問題（可多選）
                </Typography>
                
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 2,
                  maxWidth: 800,
                  mx: 'auto'
                }}>
                  {bowelProblemOptions.map((problem) => (
                    <Chip
                      key={problem}
                      label={problem}
                      onClick={() => toggleBowelProblem(problem)}
                      color={bowelProblems.includes(problem) ? 'primary' : 'default'}
                      variant={bowelProblems.includes(problem) ? 'filled' : 'outlined'}
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
        )}

        {/* 便秘天數 */}
        {excretionType === '排便問題' && bowelProblems.includes('便秘') && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                  便秘天數
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                  請選擇您便秘的天數
                </Typography>
                
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 2,
                  maxWidth: 800,
                  mx: 'auto'
                }}>
                  {constipationDayOptions.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      onClick={() => setConstipationDays(option)}
                      color={constipationDays === option ? 'primary' : 'default'}
                      variant={constipationDays === option ? 'filled' : 'outlined'}
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
        )}

        {/* 腹瀉次數 */}
        {excretionType === '排便問題' && bowelProblems.includes('腹瀉') && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                  腹瀉次數
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                  請選擇您腹瀉的次數
                </Typography>
                
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 2,
                  maxWidth: 800,
                  mx: 'auto'
                }}>
                  {diarrheaTimeOptions.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      onClick={() => setDiarrheaTimes(option)}
                      color={diarrheaTimes === option ? 'primary' : 'default'}
                      variant={diarrheaTimes === option ? 'filled' : 'outlined'}
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
        )}

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

export default ExcretionPage; 