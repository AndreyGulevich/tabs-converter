import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useIntl } from 'react-intl';

type TProps = {
  children: React.ReactNode;
};

export const Header = ({ children }: TProps) => {
  const intl = useIntl();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {intl.formatMessage({ id: 'app.title' })}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {children}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
