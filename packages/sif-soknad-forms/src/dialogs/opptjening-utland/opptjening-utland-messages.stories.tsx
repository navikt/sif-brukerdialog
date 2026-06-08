import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { opptjeningUtlandMessages_nb } from './i18n/nb';
import { opptjeningUtlandMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/OpptjeningUtland/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview
            nb={opptjeningUtlandMessages_nb}
            nn={opptjeningUtlandMessages_nn}
            title="OpptjeningUtland — tekster"
        />
    ),
};
