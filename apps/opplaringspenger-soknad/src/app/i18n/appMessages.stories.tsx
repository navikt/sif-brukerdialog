import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Meta, StoryObj } from '@storybook/react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
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
        <Block margin="xxl" padBottom="l">
            <MessagesPreview messages={appMessages} showExplanation={false} />
        </Block>
    ),
};
