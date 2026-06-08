import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { tidsperiodeMessages_nb } from './i18n/nb';
import { tidsperiodeMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/Tidsperiode/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={tidsperiodeMessages_nb} nn={tidsperiodeMessages_nn} title="Tidsperiode — tekster" />
    ),
};
