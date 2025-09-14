import { Box } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';

import { applicationIntlMessages } from './';

export default {
    title: 'i18n/AppMessages',
};

const Template = () => (
    <Box marginBlock="10">
        <MessagesPreview messages={applicationIntlMessages} showExplanation={false} />
    </Box>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
