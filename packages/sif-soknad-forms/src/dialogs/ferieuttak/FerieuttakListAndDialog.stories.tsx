import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { FerieuttakFormDialog } from './FerieuttakDialog';
import { FerieuttakList } from './FerieuttakList';
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

function FerieuttakListAndDialogStory({ ferieuttak: initialFerieuttak }: StoryProps) {
    const [items, setItems] = useState(initialFerieuttak ?? []);
    const [selected, setSelected] = useState<Ferieuttak | undefined>(undefined);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <FerieuttakList
                ferieuttak={items}
                onEdit={(uttak) => {
                    setSelected(uttak);
                    setOpen(true);
                }}
                onDelete={(uttak) => setItems(items.filter((f) => f.id !== uttak.id))}
            />
            <button
                type="button"
                onClick={() => {
                    setSelected(undefined);
                    setOpen(true);
                }}>
                Legg til ferieuttak
            </button>
            <FerieuttakFormDialog
                isOpen={open}
                ferieuttak={selected}
                alleFerieuttak={items}
                minDate={today.subtract(1, 'year').toDate()}
                maxDate={today.add(1, 'year').toDate()}
                onCancel={() => {
                    setOpen(false);
                    setSelected(undefined);
                }}
                onValidSubmit={(uttak) => {
                    setItems(selected ? items.map((f) => (f.id === uttak.id ? uttak : f)) : [...items, uttak]);
                    setOpen(false);
                    setSelected(undefined);
                }}
            />
        </div>
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
