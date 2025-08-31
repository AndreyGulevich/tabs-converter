import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useIntl } from 'react-intl';

type TProps = {
  isDarkMode: boolean;
  onToggle: () => void;
};

export const ThemeToggle = ({ isDarkMode, onToggle }: TProps) => {
  const intl = useIntl();

  return (
    <Tooltip title={intl.formatMessage({ id: isDarkMode ? 'theme.light' : 'theme.dark' })}>
      <IconButton onClick={onToggle} color="inherit">
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};
