import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from '@components/theme/dropdown-menu/DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    triggerContent: { control: false },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerContent: 'Ouvrir le menu',
    items: [
      { id: 'profile', label: 'Mon profil', onSelect: () => undefined },
      { id: 'settings', label: 'Parametres', onSelect: () => undefined },
      { id: 'logout', label: 'Deconnexion', onSelect: () => undefined },
    ],
  },
};
