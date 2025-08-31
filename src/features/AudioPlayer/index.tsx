import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Slider, 
  Button,
  Grid 
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  Stop, 
  VolumeUp,
  Download 
} from '@mui/icons-material';
import { useIntl } from 'react-intl';

export const AudioPlayer = () => {
  const intl = useIntl();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [speed, setSpeed] = useState(1);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleSpeedChange = (_: Event, newValue: number | number[]) => {
    setSpeed(newValue as number);
  };

  const handleDownload = () => {
    // Имитация скачивания
    console.log('Downloading audio file...');
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {intl.formatMessage({ id: 'player.title' })}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton 
          onClick={isPlaying ? handlePause : handlePlay}
          size="large"
          color="primary"
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        
        <IconButton onClick={handleStop} size="large">
          <Stop />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VolumeUp />
            <Typography variant="body2" sx={{ minWidth: 60 }}>
              {intl.formatMessage({ id: 'player.volume' })}
            </Typography>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="body2" sx={{ minWidth: 30 }}>
              {volume}%
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 60 }}>
              {intl.formatMessage({ id: 'player.speed' })}
            </Typography>
            <Slider
              value={speed}
              onChange={handleSpeedChange}
              min={0.5}
              max={2}
              step={0.1}
              aria-label="Speed"
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="body2" sx={{ minWidth: 30 }}>
              {speed}x
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleDownload}
          disabled={!isPlaying}
        >
          {intl.formatMessage({ id: 'player.download' })}
        </Button>
      </Box>
    </Paper>
  );
};
