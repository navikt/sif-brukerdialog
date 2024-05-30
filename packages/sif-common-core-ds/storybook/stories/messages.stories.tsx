import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { commonMessages } from '../../src/i18n/common.messages';
import StoryWrapper from '../decorators/StoryWrapper';

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
    <>
        <Block margin="xxl" padBottom="l">
            <MessagesPreview messages={commonMessages} showExplanation={false} />
        </Block>
    </>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
