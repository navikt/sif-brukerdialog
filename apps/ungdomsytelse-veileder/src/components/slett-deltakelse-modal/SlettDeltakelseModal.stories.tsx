import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import SlettDeltakelseModal from './SlettDeltakelseModal';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withRouter } from '../../../storybook/decorators/withRouter';
import { registrertDeltakerMock } from '../../../mock/msw/mocks/registrert-deltaker-mock/data';
import { deltakelseSchema, registrertDeltakerSchema } from '@navikt/ung-common';

const meta: Meta<typeof SlettDeltakelseModal> = {
    component: SlettDeltakelseModal,
    title: 'Modal/Slett deltakelse ',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider, withRouter],
};
export default meta;

type Story = StoryObj<typeof SlettDeltakelseModal>;

export const Default: Story = {
    name: 'Slett deltakelse',
    args: {
        deltakelse: deltakelseSchema.parse(registrertDeltakerMock.deltakelse),
        deltaker: registrertDeltakerSchema.parse(registrertDeltakerMock.deltakerPersonalia),
    },
};
