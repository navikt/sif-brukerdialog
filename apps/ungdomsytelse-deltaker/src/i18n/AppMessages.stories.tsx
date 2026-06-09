import { Box, Heading } from '@navikt/ds-react';
import { I18nMessagesPreview } from '@sif/soknad-ui';
import { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../storybook/decorators/withIntl';
import { innsynMessages_nb } from '../apps/innsyn/i18n/messages/nb';
import { innsynMessages_nn } from '../apps/innsyn/i18n/messages/nn';
import { ungSoknadMessages_nb } from '../apps/søknad/i18n/messages/nb';
import { ungSoknadMessages_nn } from '../apps/søknad/i18n/messages/nn';

const meta: Meta = {
    title: 'i18n',
    decorators: [withIntl],
};
export default meta;

type Story = StoryObj;

export const InnsynTeksterStory: Story = {
    name: 'Innsyn',
    render: () => (
        <Box padding="space-40">
            <Heading level="1" size="large" spacing>
                Innsynstekster
            </Heading>
            <I18nMessagesPreview nb={innsynMessages_nb} nn={innsynMessages_nn} />
        </Box>
    ),
};
export const SøknadTeksterStory: Story = {
    name: 'Søknad',
    render: () => (
        <Box padding="space-40">
            <Heading level="1" size="large" spacing>
                Søknadstekster
            </Heading>
            <I18nMessagesPreview nb={ungSoknadMessages_nb} nn={ungSoknadMessages_nn} />
        </Box>
    ),
};
