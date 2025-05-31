import type { Meta, StoryObj } from '@storybook/react';
import { registrertDeltakerSchema } from '@navikt/ung-common';
import { registrertDeltakerMock } from '../../../mock/msw/mocks/data/registrertDeltakerMock';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withRouter } from '../../../storybook/decorators/withRouter';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import SlettDeltakerModal from './SlettDeltakerModal';

const meta: Meta<typeof SlettDeltakerModal> = {
    component: SlettDeltakerModal,
    title: 'Modal/Slett deltaker ',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider, withRouter],
};
export default meta;

type Story = StoryObj<typeof SlettDeltakerModal>;

export const Default: Story = {
    name: 'Slett deltaker',
    args: {
        deltaker: registrertDeltakerSchema.parse(registrertDeltakerMock.deltakerPersonalia),
    },
};
