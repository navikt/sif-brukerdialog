import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { commonMessages } from '../../src/i18n/common.messages';
import StoryWrapper from '../decorators/StoryWrapper';
import { Box } from '@navikt/ds-react';

export default {
    title: 'i18n/CommonMessages',
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
};

const Template = () => (
    <Box paddingBlock="8">
        <MessagesPreview messages={commonMessages} showExplanation={false} />
    </Box>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
