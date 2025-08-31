import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { Header } from './widgets/Header';
import { FileUpload } from './features/FileUpload';
import { AudioPlayer } from './features/AudioPlayer';
import { ThemeToggle } from './features/ThemeToggle';
import { LanguageToggle } from './features/LanguageToggle';
import { messages } from './shared/config/messages';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [locale, setLocale] = useState('ru');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh' }}>
          <Header>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </Header>
          <Box sx={{ p: 3 }}>
            <FileUpload />
            <AudioPlayer />
          </Box>
        </Box>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
