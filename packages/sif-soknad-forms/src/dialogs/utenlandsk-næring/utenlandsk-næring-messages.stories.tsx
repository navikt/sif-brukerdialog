import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { utenlandskNæringMessages_nb } from './i18n/nb';
import { utenlandskNæringMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/UtenlandskNæring/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview
            nb={utenlandskNæringMessages_nb}
            nn={utenlandskNæringMessages_nn}
            title="UtenlandskNæring — tekster"
        />
    ),
};
