import { Box } from '@navikt/ds-react';
import { Meta, StoryObj } from '@storybook/react-vite';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { withIntl } from '../../storybook/decorators/withIntl';
import { appMessages } from './appMessages';

const meta: Meta = {
    title: 'i18n/AppMessages',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<any>;

export const Default: Story = {
    render: () => (
        <Box marginBlock="10">
            <MessagesPreview messages={appMessages} showExplanation={false} />
        </Box>
    ),
};
