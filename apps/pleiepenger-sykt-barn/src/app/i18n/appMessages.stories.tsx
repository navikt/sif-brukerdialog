import { BoxNew } from '@navikt/ds-react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';

import { withStepWrapper } from '../../storybook/decorators';
import { appMessages } from './';

export default {
    title: 'i18n/AppMessages',
    decorators: [withStepWrapper],
};

const Template = () => (
    <>
        <BoxNew marginBlock="10 6">
            <MessagesPreview messages={appMessages} showExplanation={false} />
        </BoxNew>
    </>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
