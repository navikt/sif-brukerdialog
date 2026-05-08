import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { bostedUtlandMessages_nb } from './i18n/nb';
import { bostedUtlandMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/BostedUtland/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview nb={bostedUtlandMessages_nb} nn={bostedUtlandMessages_nn} title="BostedUtland — tekster" />
    ),
};
