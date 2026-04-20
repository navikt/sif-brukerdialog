import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { FerieuttakListAndDialog } from './FerieuttakListAndDialog';
import type { Ferieuttak } from './index';

const today = dayjs();

const exampleFerieuttak: Ferieuttak[] = [
    {
        id: '1',
        from: today.subtract(3, 'month').toDate(),
        to: today.subtract(3, 'month').add(6, 'day').toDate(),
    },
    {
        id: '2',
        from: today.add(2, 'month').toDate(),
        to: today.add(2, 'month').add(13, 'day').toDate(),
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
            minDate={today.subtract(1, 'year').toDate()}
            maxDate={today.add(1, 'year').toDate()}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.ferieuttak.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta = {
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
