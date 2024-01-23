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
};

export const MedHeaderTitle: Story = {
    name: 'Med headerTitle',
    decorators: [withIntl],
    render: () => <LoadingPage headerTitle="Navn på applikasjon" />,
};
