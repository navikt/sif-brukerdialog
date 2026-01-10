import type { Meta, StoryObj } from '@storybook/react-vite';
import { registrertDeltakerMock } from '../../../mock/data/registrertDeltakerMock';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withRouter } from '../../../storybook/decorators/withRouter';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { registrertDeltakerSchema } from '../../types/Deltaker';
import SlettAktivDeltakelseModal from './SlettAktivDeltakelseModal';

const meta: Meta<typeof SlettAktivDeltakelseModal> = {
    component: SlettAktivDeltakelseModal,
    title: 'Skjema/Slett aktiv deltakelse ',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider, withRouter],
};
export default meta;

type Story = StoryObj<typeof SlettAktivDeltakelseModal>;

export const Default: Story = {
    name: 'Slett aktiv deltakelse',
    args: {
        deltaker: registrertDeltakerSchema.parse(registrertDeltakerMock.deltakerPersonalia),
    },
};
