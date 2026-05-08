import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { fosterbarnMessages_nb } from './i18n/nb';
import { fosterbarnMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/Fosterbarn/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={fosterbarnMessages_nb} nn={fosterbarnMessages_nn} title="Fosterbarn — tekster" />
    ),
};
