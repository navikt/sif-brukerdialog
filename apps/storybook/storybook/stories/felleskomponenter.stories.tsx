import { Meta, StoryObj } from '@storybook/react';
import { commonMessages } from '../../../../packages/sif-common-core-ds/src/i18n/common.messages';
import { formsMessages } from '../../../../packages/sif-common-forms-ds/src/i18n/forms.messages';
import { soknadMessages } from '../../../../packages/sif-common-soknad-ds/src/i18n/soknad.messages';
import { uiMessages } from '../../../../packages/sif-common-ui/src/i18n/ui.messages';

import MessagesPreview, {
    MessagesPreviewProps,
} from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';

const meta: Meta<MessagesPreviewProps> = {
    title: 'Felleskomponenter',
    component: MessagesPreview,
    args: {
        showExplanation: false,
        showMissingTextSummary: true,
    },
};
export default meta;

type Story = StoryObj<MessagesPreviewProps>;

export const SifCommonCore: Story = {
    name: 'sif-common-core',
    args: {
        messages: commonMessages,
    },
};

export const SifCommonForms: Story = {
    name: 'sif-common-forms',
    args: {
        messages: formsMessages,
    },
};

export const SifCommonSoknar: Story = {
    name: 'sif-common-soknad',
    args: {
        messages: soknadMessages,
    },
};

export const UiMessages: Story = {
    name: 'sif-common-ui',
    args: {
        messages: uiMessages,
    },
};
