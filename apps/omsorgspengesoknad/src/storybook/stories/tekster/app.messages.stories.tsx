import { Meta, StoryObj } from '@storybook/react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { appMessages } from '../../../app/i18n/appMessages';

const meta: Meta<typeof MessagesPreview> = {
    component: MessagesPreview,
    title: 'i18n/app.messages',
    decorators: [],
};

export default meta;

type Story = StoryObj<typeof MessagesPreview>;

export const Default: Story = {
    name: 'Default',
    render: () => (
        <MessagesPreview
            messages={appMessages}
            showMissingTextSummary={true}
            showExplanation={false}
            title="@forms.messages"
        />
    ),
};
