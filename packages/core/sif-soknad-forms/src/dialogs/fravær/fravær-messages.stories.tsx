import { I18nMessagesPreview } from '@sif/soknad-ui/components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { fraværMessages_nb } from './i18n/nb';
import { fraværMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/Fravær/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => <I18nMessagesPreview nb={fraværMessages_nb} nn={fraværMessages_nn} title="Fravær — tekster" />,
};
