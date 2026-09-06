import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreferredSourceButton } from './PreferredSourceButton';

/* Note: the live button only renders on the production domain once Google lists
   it in its source preferences tool. In Storybook the marker div stays empty. */
const meta = {
  title: 'Molecules/PreferredSourceButton',
  component: PreferredSourceButton,
} satisfies Meta<typeof PreferredSourceButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
    lang: 'en',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    lang: 'en',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
