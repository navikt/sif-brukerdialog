import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import BekreftSlettAktivDeltakerDialog from './BekreftSlettAktivDeltakerDialog';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';

const meta: Meta<typeof BekreftSlettAktivDeltakerDialog> = {
    component: BekreftSlettAktivDeltakerDialog,
    title: 'Components/BekreftSlettAktivDeltakerDialog',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof BekreftSlettAktivDeltakerDialog>;

export const BekreftSlettAktivDeltakerDialogStory: Story = {
    name: 'BekreftSlettAktivDeltakerDialog',
    args: { deltakerNavn: 'SNODIG SKRUE', open: true },
};
