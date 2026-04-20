import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { SifSoknadFormsText } from '../../i18n';
import { BostedUtlandListAndDialog } from './BostedUtlandListAndDialog';
import type { BostedUtland } from './index';

type StoryProps = {
    bosteder?: BostedUtland[];
};

const today = dayjs();

const exampleBosteder: BostedUtland[] = [
    {
        id: '1',
        landkode: 'SWE',
        landnavn: 'Sverige',
        periode: {
            from: today.subtract(8, 'month').toDate(),
            to: today.subtract(6, 'month').subtract(10, 'day').toDate(),
        },
    },
    {
        id: '2',
        landkode: 'DNK',
        landnavn: 'Danmark',
        periode: {
            from: today.subtract(4, 'month').toDate(),
            to: today.subtract(2, 'month').subtract(10, 'day').toDate(),
        },
    },
];

function BostedUtlandListAndDialogStory({ bosteder }: StoryProps) {
    const [items, setItems] = useState(bosteder);

    return (
        <BostedUtlandListAndDialog
            minDate={today.subtract(1, 'year').toDate()}
            maxDate={today.add(1, 'year').toDate()}
            bosteder={items}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta = {
    title: 'Dialogs/BostedUtland/ListAndDialog',
    component: BostedUtlandListAndDialogStory,
    decorators: [
        (Story) => {
            return (
                <StoryFrame maxWidth={720} minHeight={700}>
                    <Story />
                </StoryFrame>
            );
        },
    ],
    args: {
        bosteder: exampleBosteder,
    },
} satisfies Meta<typeof BostedUtlandListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        bosteder: [],
    },
};
