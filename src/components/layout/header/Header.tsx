import CustomButton from '@components/theme/custom-button/CustomButton';
import useMessages from '@i18n/hooks/messagesHook';
import { getGlobalInstance } from 'plume-ts-di';
import { useObservable } from 'micro-observables';
import { Locale } from '@lib/locale-resolver/LocaleResolver';
import LocaleSelector from '@components/theme/LocaleSelector';
import LocaleService from '@i18n/locale/LocaleService';
import HomeIcon from '@mui/icons-material/Home';
import scss from './header.module.scss';

function LocaleSelectorContainer() {
  const localeService: LocaleService = getGlobalInstance(LocaleService);
  const currentLocale: Locale = useObservable(localeService.getCurrentLocale());

  return (
    <LocaleSelector
      currentLocale={currentLocale}
      availableLocales={localeService.getAvailableLocales()}
      onLocaleSelected={(newLocale: Locale) => localeService.setCurrentLocale(newLocale)}
    />
  );
}

export default function Header() {
  const { messages } = useMessages();

  return (
    <header className={scss.header}>
      <div className={scss.headerAppName}>
        <HomeIcon />
        <h3>{messages.app_name}</h3>
      </div>
      <div className={scss.headerActions}>
        <CustomButton label="Home" />
        <LocaleSelectorContainer />
      </div>
    </header>
  );
}
