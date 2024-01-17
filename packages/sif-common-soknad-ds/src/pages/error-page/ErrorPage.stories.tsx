import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import ErrorPage from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
    component: ErrorPage,
    title: 'Pages/ErrorPage',
};

export default meta;

type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {
    decorators: [withIntl],
    render: () => <ErrorPage />,
    parameters: {
        locale: 'nb',
    },
};

export const Nynorsk: Story = {
    decorators: [withIntl],
    render: () => <ErrorPage />,
    parameters: {
        locale: 'nn',
    },
};
