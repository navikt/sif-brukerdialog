import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../storybook/decorators/withIntl';
import FlereDeltakelserPage from './FlereDeltakelserPage';
import HentDeltakerErrorPage from './HentDeltakerErrorPage';
import IngenDeltakelsePage from './IngenDeltakelsePage';
import UngLoadingPage from './UngLoadingPage';

const meta: Meta = {
    title: 'Innsyn/Sider/Støttesider og feilsider',
    parameters: {},
    decorators: [withIntl],
};
export default meta;

type Story = StoryObj;

export const Loading: Story = {
    name: 'Henter informasjon',
    render: () => <UngLoadingPage />,
};
export const IngenDeltakelse: Story = {
    render: () => <IngenDeltakelsePage />,
};
export const FlereDeltakelser: Story = {
    render: () => <FlereDeltakelserPage />,
};
export const HentDeltakerError: Story = {
    render: () => <HentDeltakerErrorPage error="[Teknisk feilmelding]" />,
};
