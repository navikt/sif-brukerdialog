import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import LoadingPage from './LoadingPage';

const meta: Meta<typeof LoadingPage> = {
    component: LoadingPage,
    title: 'Pages/LoadingPage',
};

export default meta;

type Story = StoryObj<typeof LoadingPage>;

export const Default: Story = {
    decorators: [withIntl],
    render: () => <LoadingPage />,
    parameters: {
        locale: 'nb',
    },
};

export const Nynorsk: Story = {
    name: 'Nynorsk',

    decorators: [withIntl],
    render: () => <LoadingPage />,
    parameters: {
        locale: 'nn',
    },
};
