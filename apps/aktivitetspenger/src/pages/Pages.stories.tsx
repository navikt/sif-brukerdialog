import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../storybook/decorators/withIntl';
import ErrorPage from './HentAppInfoErrorPage';
import LoadingPage from './LoadingPage';

const meta: Meta = {
    title: 'Innsyn/Sider/Støttesider og feilsider',
    parameters: {},
    decorators: [withIntl],
};
export default meta;

type Story = StoryObj;

export const Loading: Story = {
    name: 'Henter informasjon',
    render: () => <LoadingPage />,
};
export const HentDeltakerError: Story = {
    render: () => <ErrorPage error="[Teknisk feilmelding]" />,
};
