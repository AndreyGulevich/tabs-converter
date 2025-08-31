import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

type TProps = {
  locale: string;
  onToggle: () => void;
};

export const LanguageToggle = ({ locale, onToggle }: TProps) => {
  const intl = useIntl();

  return (
    <Button 
      onClick={onToggle} 
      color="inherit"
      variant="outlined"
      size="small"
    >
      {intl.formatMessage({ id: `language.${locale === 'ru' ? 'en' : 'ru'}` })}
    </Button>
  );
};
