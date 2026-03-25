import DropdownMenu, { DropdownMenuItem } from '@components/theme/dropdown-menu/DropdownMenu';
import { Locale } from '@lib/locale-resolver/LocaleResolver';
import classNames from '@lib/class-names/ClassNames';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import useMessages from '@i18n/hooks/messagesHook';
import scss from './language-selector.module.scss';

type LanguageSelectorProps = {
  availableLocales: Locale[],
  currentLocale: Locale,
  onLocaleSelected: (locale: Locale) => void,
  className?: string,
  align?: 'start' | 'end',
};

function resolveFlagCountryCode(localeCode: string): string {
  const countryCodeByLocaleCode: Record<string, string> = {
    en: 'GB',
    fr: 'FR',
    nl: 'NL',
  };

  return countryCodeByLocaleCode[localeCode] ?? localeCode.toUpperCase();
}

function countryCodeToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .slice(0, 2)
    .split('')
    .map((character: string) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join('');
}

export default function LanguageSelector(
  {
    availableLocales,
    currentLocale,
    onLocaleSelected,
    className,
    align = 'end',
  }: LanguageSelectorProps,
) {
  const { messages } = useMessages();
  const items: DropdownMenuItem[] = availableLocales.map((locale: Locale) => ({
    id: locale.code,
    label: (
      <span
        className={classNames(
          scss.languageSelectorItem,
          locale.code === currentLocale.code ? scss.languageSelectorItemCurrent : undefined,
        )}
      >
        <span className={scss.languageSelectorFlag} aria-hidden="true">
          {countryCodeToFlag(resolveFlagCountryCode(locale.code))}
        </span>
        <span>{locale.name}</span>
        {
          locale.code === currentLocale.code
            ? <span className={scss.languageSelectorCurrent}>{messages.language.current}</span>
            : null
        }
      </span>
    ),
    onSelect: () => onLocaleSelected(locale),
    disabled: locale.code === currentLocale.code,
  }));

  return (
    <DropdownMenu
      triggerContent={(
        <span className={classNames(scss.languageSelectorTrigger, className)}>
          <LanguageIcon fontSize="small" />
          <span className={scss.languageSelectorFlag} aria-hidden="true">
            {countryCodeToFlag(resolveFlagCountryCode(currentLocale.code))}
          </span>
          <span className={scss.languageSelectorLabel}>{currentLocale.name}</span>
          <KeyboardArrowDownIcon className={scss.languageSelectorChevron} fontSize="small" />
        </span>
      )}
      items={items}
      align={align}
      triggerClassName={scss.languageSelector}
      menuLabel={messages.language.menu}
    />
  );
}
