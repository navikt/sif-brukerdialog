import * as React from 'react';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { appMessages } from '../../../app/i18n/appMessages';

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
        <Block margin="xxl" padBottom="l">
            <MessagesPreview messages={appMessages} showExplanation={false} />
        </Block>
    </>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
