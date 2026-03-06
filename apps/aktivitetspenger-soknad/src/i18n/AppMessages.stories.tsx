import { Box, Heading } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../storybook/decorators/withIntl';
import { soknadMessages_nb } from './messages/nb';
import { soknadMessages_nn } from './messages/nn';

const meta: Meta = {
    title: 'i18n',
    decorators: [withIntl],
};
export default meta;

type Story = StoryObj;

export const SøknadTeksterStory: Story = {
    name: 'Søknad',
    render: () => (
        <Box padding="space-40">
            <Heading level="1" size="large" spacing>
                Søknadstekster
            </Heading>
            <MessagesPreview
                messages={{
                    nb: soknadMessages_nb,
                    nn: soknadMessages_nn,
                }}
                showExplanation={false}
            />
        </Box>
    ),
};
