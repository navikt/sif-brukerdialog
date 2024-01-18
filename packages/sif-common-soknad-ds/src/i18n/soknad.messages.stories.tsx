import { Meta, StoryObj } from '@storybook/react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { soknadMessages } from './soknad.messages';

const meta: Meta<typeof MessagesPreview> = {
    component: MessagesPreview,
    title: 'i18n/Alle tekster',
    decorators: [],
};

export default meta;

type Story = StoryObj<typeof MessagesPreview>;

export const Default: Story = {
    name: 'Default',
    render: () => <MessagesPreview messages={soknadMessages} showMissingTextSummary={true} showExplanation={false} />,
};
