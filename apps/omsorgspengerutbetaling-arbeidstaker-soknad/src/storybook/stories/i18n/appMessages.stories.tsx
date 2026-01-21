import { Box } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';

import { appMessages } from '../../../app/i18n';
import { withAnalyticsProvider } from '../../decorators/withAnalyticsProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'i18n/Appmessages',

    decorators: [
        withIntl,
        withRouterProvider,
        withAnalyticsProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
};

const Template = () => (
    <Box marginBlock="space-40" paddingBlock="space-32">
        <MessagesPreview messages={appMessages} showExplanation={false} />
    </Box>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
