import { Box } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../storybook/decorators/withIntl';
import { appMessages } from './appMessages';

const meta: Meta = {
    title: 'i18n/Messages',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<any>;

export const Default: Story = {
    render: () => (
        <Box marginBlock="8">
            <MessagesPreview messages={appMessages} showExplanation={false} />
        </Box>
    ),
};
