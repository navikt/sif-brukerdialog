import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { ferieuttakMessages_nb } from './i18n/nb';
import { ferieuttakMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/Ferieuttak/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={ferieuttakMessages_nb} nn={ferieuttakMessages_nn} title="Ferieuttak — tekster" />
    ),
};
