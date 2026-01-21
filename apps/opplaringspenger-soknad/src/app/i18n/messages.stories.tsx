import { Box } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../storybook/decorators/withIntl';
import { applicationIntlMessages } from './';

const meta: Meta = {
    title: 'i18n/All messages',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<any>;

export const Default: Story = {
    render: () => (
        <Box marginBlock="space-40">
            <MessagesPreview messages={applicationIntlMessages} showExplanation={false} />
        </Box>
    ),
};
