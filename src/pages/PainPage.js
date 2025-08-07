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
  Divider,
  Slider,
  Stack
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  ArrowForward as NextIcon
} from '@mui/icons-material';

const PainPage = () => {
  const navigate = useNavigate();
  const [painLevel, setPainLevel] = useState(0);
  const [painLocation, setPainLocation] = useState('');
  const [painType, setPainType] = useState('');
  const [painDuration, setPainDuration] = useState('');

  const painLocations = [
    '手術部位',
    '頸部',
    '臉部',
    '頭部',
    '胸部',
    '腹部'
  ];

  const painTypes = [
    '刺痛',
    '鈍痛',
    '抽痛',
    '灼熱痛',
    '壓迫痛',
    '跳痛'
  ];

  const durations = [
    '持續性',
    '間歇性',
    '活動時加重',
    '休息時加重',
    '進食時加重'
  ];

  const getPainLevelText = (level) => {
    if (level === 0) return '無疼痛';
    if (level <= 3) return '輕微疼痛';
    if (level <= 6) return '中度疼痛';
    if (level <= 8) return '嚴重疼痛';
    return '極度疼痛';
  };

  const getPainLevelColor = (level) => {
    if (level === 0) return '#4CAF50';
    if (level <= 3) return '#FF9800';
    if (level <= 6) return '#FF5722';
    if (level <= 8) return '#D32F2F';
    return '#B71C1C';
  };

  const savePainData = () => {
    const painData = {
      level: painLevel,
      levelText: getPainLevelText(painLevel),
      location: painLocation,
      type: painType,
      duration: painDuration,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('painData', JSON.stringify(painData));
  };

  const handleNext = () => {
    savePainData();
    navigate('/summary');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box>
      {/* 標題 */}
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
            疼痛評估
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          請詳細描述您的疼痛狀況
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* 疼痛程度 - VAS量表 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                疼痛程度評估 (VAS 0-10)
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請在下方滑桿上選擇最能描述您目前疼痛程度的數值
              </Typography>
              
              <Box sx={{ px: 2, py: 4 }}>
                <Stack spacing={3} alignItems="center">
                  <Typography variant="h2" sx={{ 
                    fontWeight: 'bold', 
                    color: getPainLevelColor(painLevel),
                    textAlign: 'center',
                    mb: 2
                  }}>
                    {painLevel}
                  </Typography>
                  
                  <Typography variant="h5" sx={{ 
                    color: getPainLevelColor(painLevel),
                    textAlign: 'center',
                    mb: 3,
                    fontWeight: 'bold'
                  }}>
                    {getPainLevelText(painLevel)}
                  </Typography>
                  
                  <Slider
                    value={painLevel}
                    onChange={(event, newValue) => setPainLevel(newValue)}
                    min={0}
                    max={10}
                    step={1}
                    marks={[
                      { value: 0, label: '0' },
                      { value: 2, label: '2' },
                      { value: 4, label: '4' },
                      { value: 6, label: '6' },
                      { value: 8, label: '8' },
                      { value: 10, label: '10' }
                    ]}
                    sx={{
                      width: '100%',
                      maxWidth: 600,
                      '& .MuiSlider-track': {
                        backgroundColor: getPainLevelColor(painLevel),
                        height: 8,
                      },
                      '& .MuiSlider-thumb': {
                        backgroundColor: getPainLevelColor(painLevel),
                        width: 28,
                        height: 28,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#e0e0e0',
                        height: 8,
                      },
                      '& .MuiSlider-mark': {
                        backgroundColor: '#999',
                        width: 2,
                        height: 12,
                      }
                    }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600, mt: 2 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      無疼痛
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      極度疼痛
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 疼痛位置 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                疼痛位置
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請選擇疼痛的主要位置
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {painLocations.map((location) => (
                  <Chip
                    key={location}
                    label={location}
                    onClick={() => setPainLocation(location)}
                    color={painLocation === location ? 'primary' : 'default'}
                    variant={painLocation === location ? 'filled' : 'outlined'}
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

        {/* 疼痛性質 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                疼痛性質
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請描述疼痛的感覺
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {painTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    onClick={() => setPainType(type)}
                    color={painType === type ? 'primary' : 'default'}
                    variant={painType === type ? 'filled' : 'outlined'}
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

        {/* 疼痛特徵 */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                疼痛特徵
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                請描述疼痛的時間特徵
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 2,
                maxWidth: 800,
                mx: 'auto'
              }}>
                {durations.map((duration) => (
                  <Chip
                    key={duration}
                    label={duration}
                    onClick={() => setPainDuration(duration)}
                    color={painDuration === duration ? 'primary' : 'default'}
                    variant={painDuration === duration ? 'filled' : 'outlined'}
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

export default PainPage; 