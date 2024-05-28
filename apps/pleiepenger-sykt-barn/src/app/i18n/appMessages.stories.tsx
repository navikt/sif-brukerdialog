import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { withStepWrapper } from '../../storybook/decorators';
import { appMessages } from './appMessages';

export default {
    title: 'i18n/AppMessages',
    decorators: [withStepWrapper],
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
