import { Meta, StoryObj } from '@storybook/react-vite';
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
};
