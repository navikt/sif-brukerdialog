import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { enkeltdatoMessages_nb } from './i18n/nb';
import { enkeltdatoMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/Enkeltdatoer/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={enkeltdatoMessages_nb} nn={enkeltdatoMessages_nn} title="Enkeltdatoer — tekster" />
    ),
};
