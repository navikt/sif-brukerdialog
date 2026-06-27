import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { FerieuttakListAndDialog } from './FerieuttakListAndDialog';
import type { Ferieuttak } from './index';
import { dateToISODate } from '@sif/utils';

const today = dayjs();

const exampleFerieuttak: Ferieuttak[] = [
    {
        id: '1',
        from: dateToISODate(today.subtract(3, 'month')),
        to: dateToISODate(today.subtract(3, 'month').add(6, 'day')),
    },
    {
        id: '2',
        from: dateToISODate(today.add(2, 'month')),
        to: dateToISODate(today.add(2, 'month').add(13, 'day')),
    },
];

type StoryProps = {
    ferieuttak?: Ferieuttak[];
};

function FerieuttakListAndDialogStory({ ferieuttak }: StoryProps) {
    const [items, setItems] = useState(ferieuttak);

    return (
        <FerieuttakListAndDialog
            ferieuttak={items}
            minDate={dateToISODate(today.subtract(1, 'year'))}
            maxDate={dateToISODate(today.add(1, 'year'))}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.ferieuttak.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta: Meta<typeof FerieuttakListAndDialogStory> = {
    title: 'Dialogs/Ferieuttak/ListAndDialog',
    component: FerieuttakListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        ferieuttak: exampleFerieuttak,
    },
} satisfies Meta<typeof FerieuttakListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        ferieuttak: [],
    },
};
