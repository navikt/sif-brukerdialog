import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { BostedUtlandListAndDialog } from './BostedUtlandListAndDialog';
import type { BostedUtland } from './index';
import { dateToISODate } from '@sif/utils';

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
            from: dateToISODate(today.subtract(8, 'month')),
            to: dateToISODate(today.subtract(6, 'month').subtract(10, 'day')),
        },
    },
    {
        id: '2',
        landkode: 'DNK',
        landnavn: 'Danmark',
        periode: {
            from: dateToISODate(today.subtract(4, 'month')),
            to: dateToISODate(today.subtract(2, 'month').subtract(10, 'day')),
        },
    },
];

function BostedUtlandListAndDialogStory({ bosteder }: StoryProps) {
    const [items, setItems] = useState(bosteder);

    return (
        <BostedUtlandListAndDialog
            minDate={dateToISODate(today.subtract(1, 'year'))}
            maxDate={dateToISODate(today.add(1, 'year'))}
            bosteder={items}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta: Meta<typeof BostedUtlandListAndDialogStory> = {
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
