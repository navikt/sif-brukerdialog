import type { Meta, StoryObj } from '@storybook/react-vite';
import { registrertDeltakerMock } from '../../../mock/data/registrertDeltakerMock';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withRouter } from '../../../storybook/decorators/withRouter';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { registrertDeltakerSchema } from '../../types/Deltaker';
import SlettNyDeltakerModal from './SlettNyDeltakerModal';

const meta: Meta<typeof SlettNyDeltakerModal> = {
    component: SlettNyDeltakerModal,
    title: 'Skjema/Slett ny deltaker ',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider, withRouter],
};
export default meta;

type Story = StoryObj<typeof SlettNyDeltakerModal>;

export const Default: Story = {
    name: 'Slett ny deltaker',
    args: {
        deltaker: registrertDeltakerSchema.parse(registrertDeltakerMock.deltakerPersonalia),
    },
};
