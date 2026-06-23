import type { Meta, StoryObj } from '@storybook/react-vite';
import { registrertDeltakerScenario } from '../../../mock/scenarioer/registrertDeltaker';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withRouter } from '../../../storybook/decorators/withRouter';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { registrertDeltakerSchema } from '../../types/Deltaker';
import SlettAktivDeltakerModal from './SlettAktivDeltakerModal';
import { deltakelseSchema } from '../../types/Deltakelse';

const meta: Meta<typeof SlettAktivDeltakerModal> = {
    component: SlettAktivDeltakerModal,
    title: 'Skjema/Slett aktiv deltaker ',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider, withRouter],
};
export default meta;

type Story = StoryObj<typeof SlettAktivDeltakerModal>;

export const Default: Story = {
    name: 'Slett aktiv deltaker',
    args: {
        deltaker: registrertDeltakerSchema.parse(registrertDeltakerScenario.deltakerPersonalia),
        deltakelse: deltakelseSchema.parse(registrertDeltakerScenario.deltakelse),
    },
};
