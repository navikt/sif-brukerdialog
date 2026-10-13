import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorybookDecorator } from '../../storybook/StorybookDecorator';
import { LoadingPage } from './LoadingPage';

const meta: Meta<typeof LoadingPage> = {
    title: 'Pages/LoadingPage',
    component: LoadingPage,
    decorators: [StorybookDecorator],
};

export default meta;

type Story = StoryObj<typeof LoadingPage>;

export const Default: Story = {
    name: 'LoadingPage',
    args: {
        applicationTitle: 'Søknad om pleiepenger for sykt barn',
    },
};
