import type { Meta, StoryObj } from '@storybook/react';
import IngenDeltakelsePage from './IngenDeltakelsePage';
import { withIntl } from '../../storybook/decorators/withIntl';
import LoadingPage from './LoadingPage';
import FlereDeltakelserPage from './FlereDeltakelserPage';
import HentDeltakerErrorPage from './HentDeltakerErrorPage';
const meta: Meta = {
    title: 'Pages',
    parameters: {},
    decorators: [withIntl],
};
export default meta;

type Story = StoryObj;

export const Loading: Story = {
    name: 'Henter informasjon',
    render: () => <LoadingPage />,
};
export const IngenDeltakelse: Story = {
    render: () => <IngenDeltakelsePage />,
};
export const FlereDeltakelser: Story = {
    render: () => <FlereDeltakelserPage />,
};
export const HentDeltakerError: Story = {
    render: () => <HentDeltakerErrorPage error="Teknisk feilmelding" />,
};
