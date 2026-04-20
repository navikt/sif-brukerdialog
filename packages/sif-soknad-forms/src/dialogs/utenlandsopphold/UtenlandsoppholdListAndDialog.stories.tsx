import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { UtenlandsoppholdFormDialog } from './UtenlandsoppholdDialog';
import { UtenlandsoppholdList } from './UtenlandsoppholdList';
import type { Utenlandsopphold } from './index';

const today = dayjs();

const exampleOpphold: Utenlandsopphold[] = [
    {
        id: '1',
        type: 'enkel',
        fom: today.subtract(5, 'month').toDate(),
        tom: today.subtract(4, 'month').toDate(),
        landkode: 'SWE',
    },
    {
        id: '2',
        type: 'enkel',
        fom: today.subtract(2, 'month').toDate(),
        tom: today.subtract(1, 'month').toDate(),
        landkode: 'DNK',
    },
];

type StoryProps = {
    opphold?: Utenlandsopphold[];
};

function UtenlandsoppholdListAndDialogStory({ opphold: initialOpphold }: StoryProps) {
    const [items, setItems] = useState(initialOpphold ?? []);
    const [selected, setSelected] = useState<Utenlandsopphold | undefined>(undefined);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <UtenlandsoppholdList
                utenlandsopphold={items}
                onEdit={(opphold) => {
                    setSelected(opphold);
                    setOpen(true);
                }}
                onDelete={(opphold) => setItems(items.filter((o) => o.id !== opphold.id))}
            />
            <button
                type="button"
                onClick={() => {
                    setSelected(undefined);
                    setOpen(true);
                }}>
                Legg til utenlandsopphold
            </button>
            <UtenlandsoppholdFormDialog
                isOpen={open}
                opphold={selected}
                alleOpphold={items}
                variant="enkel"
                minDate={today.subtract(1, 'year').toDate()}
                maxDate={today.add(1, 'year').toDate()}
                onCancel={() => {
                    setOpen(false);
                    setSelected(undefined);
                }}
                onValidSubmit={(opphold) => {
                    setItems(
                        selected ? items.map((o) => (o.id === opphold.id ? opphold : o)) : [...items, opphold],
                    );
                    setOpen(false);
                    setSelected(undefined);
                }}
            />
        </div>
    );
}

const meta = {
    title: 'Dialogs/Utenlandsopphold/ListAndDialog',
    component: UtenlandsoppholdListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        opphold: exampleOpphold,
    },
} satisfies Meta<typeof UtenlandsoppholdListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        opphold: [],
    },
};
