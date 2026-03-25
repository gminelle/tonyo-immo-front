import CustomButton, { ButtonVariant } from '@components/theme/custom-button/CustomButton';
import useMessages from '@i18n/hooks/messagesHook';
import { getGlobalInstance } from 'plume-ts-di';
import { useObservable } from 'micro-observables';
import { Locale } from '@lib/locale-resolver/LocaleResolver';
import LocaleSelector from '@components/theme/LocaleSelector';
import LocaleService from '@i18n/locale/LocaleService';
import UserSelector from '@components/theme/user-selector/UserSelector';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
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
      <div className={scss.headerBrand}>
        <div className={scss.headerLogo} aria-hidden="true">
          <HomeWorkOutlinedIcon />
        </div>
        <div className={scss.headerBrandText}>
          <span className={scss.headerEyebrow}>Immobilier</span>
          <h1 className={scss.headerTitle}>{messages.app_name}</h1>
        </div>
      </div>
      <div className={scss.headerActions}>
        <CustomButton
          label={messages.action.authenticate}
          variant={ButtonVariant.SECONDARY}
        />
        <CustomButton
          label={messages.action.create_account}
        />
        <LocaleSelectorContainer />
        <UserSelector
          name="Camille Bernard"
          items={[
            { id: 'profile', label: messages.account.profile, onSelect: () => undefined },
            { id: 'settings', label: messages.account.settings, onSelect: () => undefined },
            { id: 'logout', label: messages.action.disconnect, onSelect: () => undefined },
          ]}
        />
      </div>
    </header>
  );
}
