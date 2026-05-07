import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nMessagesPreview } from '@sif/soknad-ui/components';

import { utenlandsoppholdMessages_nb } from './i18n/nb';
import { utenlandsoppholdMessages_nn } from './i18n/nn';

const meta: Meta = {
    title: 'Dialogs/Utenlandsopphold/Tekster',
};

export default meta;

export const Tekster: StoryObj = {
    render: () => (
        <I18nMessagesPreview
            nb={utenlandsoppholdMessages_nb}
            nn={utenlandsoppholdMessages_nn}
            title="Utenlandsopphold — tekster"
        />
    ),
};
