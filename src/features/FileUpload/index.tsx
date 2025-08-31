import { useState, useCallback } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Alert,
  CircularProgress 
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useIntl } from 'react-intl';

export const FileUpload = () => {
  const intl = useIntl();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Проверка расширения файла
    const validExtensions = ['.gp4', '.gp5'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      setError(intl.formatMessage({ id: 'file.upload.error' }));
      setIsLoading(false);
      return;
    }

    // Имитация обработки файла
    setTimeout(() => {
      setSuccess(intl.formatMessage({ id: 'file.upload.success' }));
      setIsLoading(false);
    }, 2000);
  }, [intl]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  return (
    <Paper 
      elevation={isDragOver ? 8 : 1}
      sx={{
        p: 3,
        textAlign: 'center',
        border: '2px dashed',
        borderColor: isDragOver ? 'primary.main' : 'grey.300',
        backgroundColor: isDragOver ? 'action.hover' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".gp4,.gp5"
        style={{ display: 'none' }}
        id="file-upload"
        onChange={handleFileInput}
      />
      
      <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        {intl.formatMessage({ id: 'file.upload.title' })}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {intl.formatMessage({ id: 'file.upload.description' })}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {intl.formatMessage({ id: 'file.upload.drag' })}
      </Typography>
      
      <Button
        variant="contained"
        component="label"
        htmlFor="file-upload"
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
      >
        {intl.formatMessage({ id: 'file.upload.button' })}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Paper>
  );
};
