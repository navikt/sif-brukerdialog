import { Meta, StoryObj } from '@storybook/react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { uiMessages } from './ui.messages';

const meta: Meta<typeof MessagesPreview> = {
    component: MessagesPreview,
    title: 'i18n/ui.messages',
    decorators: [],
};

export default meta;

type Story = StoryObj<typeof MessagesPreview>;

export const Default: Story = {
    render: () => (
        <MessagesPreview
            messages={uiMessages}
            showMissingTextSummary={true}
            showExplanation={false}
            title="uiMessages"
        />
    ),
};
