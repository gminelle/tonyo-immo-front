import type { Meta, StoryObj } from '@storybook/react';
import CustomButton from '@components/theme/custom-button/CustomButton';
import Popin from '@components/theme/popin/Popin';
import { ComponentProps, useState } from 'react';

const meta: Meta<typeof Popin> = {
  title: 'Components/Popin',
  component: Popin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof Popin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args: Readonly<ComponentProps<typeof Popin>>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <CustomButton label="Ouvrir la popin" onClick={() => setIsOpen(true)} />
        <Popin
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p>Contenu de demonstration</p>
        </Popin>
      </>
    );
  },
  args: {
    isOpen: false,
    title: 'Popin de demonstration',
    children: undefined,
    onClose: () => undefined,
  },
};
