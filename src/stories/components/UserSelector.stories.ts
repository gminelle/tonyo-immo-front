import type { Meta, StoryObj } from '@storybook/react';
import UserSelector from '@components/theme/user-selector/UserSelector';

const meta: Meta<typeof UserSelector> = {
  title: 'Components/UserSelector',
  component: UserSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
  },
} satisfies Meta<typeof UserSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Tonyo Immo',
    imageUrl: 'https://i.pravatar.cc/100?img=12',
    items: [
      { id: 'account', label: 'Mon compte', onSelect: () => undefined },
      { id: 'billing', label: 'Facturation', onSelect: () => undefined },
      { id: 'logout', label: 'Se deconnecter', onSelect: () => undefined },
    ],
  },
};

export const WithoutImage: Story = {
  args: {
    name: 'Camille Bernard',
    items: [
      { id: 'profile', label: 'Profil', onSelect: () => undefined },
      { id: 'logout', label: 'Se deconnecter', onSelect: () => undefined },
    ],
  },
};
