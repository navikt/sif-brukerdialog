import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { arbeidUtlandMessages_nb } from './i18n/nb';
import { arbeidUtlandMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/ArbeidUtland/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={arbeidUtlandMessages_nb} nn={arbeidUtlandMessages_nn} title="ArbeidUtland — tekster" />
    ),
};
