import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { appMessages } from '../../../app/i18n';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'i18n/Appmessages',

    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
};

const Template = () => (
    <>
        <MessagesPreview messages={appMessages} showExplanation={false} />
    </>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
