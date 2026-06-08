import { I18nMessagesPreview } from '@sif/soknad-ui/components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { annetBarnMessages_nb } from './i18n/nb';
import { annetBarnMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/AnnetBarn/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={annetBarnMessages_nb} nn={annetBarnMessages_nn} title="AnnetBarn — tekster" />
    ),
};
