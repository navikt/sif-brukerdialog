import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorybookDecorator } from '../../storybook/StorybookDecorator';
import { ErrorPage } from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
    title: 'Pages/ErrorPage',
    component: ErrorPage,
    decorators: [StorybookDecorator],
};

export default meta;

type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {
    name: 'ErrorPage',
    args: {
        applicationTitle: 'Tittel på søknad',
    },
};
