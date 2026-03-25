import LanguageSelector from '@components/theme/language-selector/LanguageSelector';
import { Locale } from '@lib/locale-resolver/LocaleResolver';

type LocaleSelectorProps = {
  availableLocales: Locale[],
  onLocaleSelected: (locale: Locale) => void,
  currentLocale: Locale,
};

export default function LocaleSelector(
  { availableLocales, onLocaleSelected, currentLocale }: LocaleSelectorProps,
) {
  return (
    <LanguageSelector
      availableLocales={availableLocales}
      currentLocale={currentLocale}
      onLocaleSelected={onLocaleSelected}
    />
  );
}
