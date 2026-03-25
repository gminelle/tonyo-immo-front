import DropdownMenu, { DropdownMenuItem } from '@components/theme/dropdown-menu/DropdownMenu';
import { Locale } from '@lib/locale-resolver/LocaleResolver';
import classNames from '@lib/class-names/ClassNames';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import scss from './language-selector.module.scss';

type LanguageSelectorProps = {
  availableLocales: Locale[],
  currentLocale: Locale,
  onLocaleSelected: (locale: Locale) => void,
  className?: string,
  align?: 'start' | 'end',
};

export default function LanguageSelector(
  {
    availableLocales,
    currentLocale,
    onLocaleSelected,
    className,
    align = 'end',
  }: LanguageSelectorProps,
) {
  const items: DropdownMenuItem[] = availableLocales.map((locale: Locale) => ({
    id: locale.code,
    label: (
      <span className={scss.languageSelectorItem}>
        <span>{locale.name}</span>
        {
          locale.code === currentLocale.code
            ? <span className={scss.languageSelectorCurrent}>Actuelle</span>
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
          <span className={scss.languageSelectorLabel}>{currentLocale.name}</span>
          <KeyboardArrowDownIcon className={scss.languageSelectorChevron} fontSize="small" />
        </span>
      )}
      items={items}
      align={align}
      triggerClassName={scss.languageSelector}
      menuLabel="Language selector"
    />
  );
}
