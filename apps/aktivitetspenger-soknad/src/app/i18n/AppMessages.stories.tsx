import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { appMessages_nb } from './nb';
import { appMessages_nn } from './nn';
import { Box } from '@navikt/ds-react';

const meta: Meta = {
    title: 'Søknad/Tekster',
    decorators: [withIntl],
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <Box padding={'space-24'}>
            <I18nMessagesPreview nb={appMessages_nb} nn={appMessages_nn} title="App-tekster" />
        </Box>
    ),
};
