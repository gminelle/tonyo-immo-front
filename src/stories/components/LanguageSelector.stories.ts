import type { Meta, StoryObj } from '@storybook/react';
import LanguageSelector from '@components/theme/language-selector/LanguageSelector';
import { Locale } from '@lib/locale-resolver/LocaleResolver';

const meta: Meta<typeof LanguageSelector> = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const LOCALE_FR: Locale = { code: 'fr', name: 'Francais' };
const LOCALE_EN: Locale = { code: 'en', name: 'English' };
const LOCALE_NL: Locale = { code: 'nl', name: 'Nederlands' };

export const Default: Story = {
  args: {
    availableLocales: [LOCALE_FR, LOCALE_EN, LOCALE_NL],
    currentLocale: LOCALE_FR,
    onLocaleSelected: () => undefined,
  },
};
