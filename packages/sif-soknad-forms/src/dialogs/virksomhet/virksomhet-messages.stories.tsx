import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { virksomhetMessages_nb } from './i18n/nb';
import { virksomhetMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/Virksomhet/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={virksomhetMessages_nb} nn={virksomhetMessages_nn} title="Virksomhet — tekster" />
    ),
};
