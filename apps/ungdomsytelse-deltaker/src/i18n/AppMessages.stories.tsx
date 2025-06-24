import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';

import { applicationIntlMessages } from './';

export default {
    title: 'i18n/AppMessages',
};

const Template = () => (
    <>
        <Block margin="xxl" padBottom="l">
            <MessagesPreview messages={applicationIntlMessages} showExplanation={false} />
        </Block>
    </>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
