import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { OpptjeningUtlandFormDialog } from './OpptjeningUtlandDialog';
import { OpptjeningUtlandList } from './OpptjeningUtlandList';
import { OpptjeningAktivitet, type OpptjeningUtland } from './index';

const today = dayjs();

const exampleOpptjeninger: OpptjeningUtland[] = [
    {
        id: '1',
        fom: today.subtract(2, 'year').toDate(),
        tom: today.subtract(1, 'year').subtract(1, 'day').toDate(),
        landkode: 'SWE',
        opptjeningType: OpptjeningAktivitet.ARBEIDSTAKER,
        navn: 'IKEA AB',
    },
];

type StoryProps = {
    opptjeninger?: OpptjeningUtland[];
};

function OpptjeningUtlandListAndDialogStory({ opptjeninger: initialOpptjeninger }: StoryProps) {
    const [items, setItems] = useState(initialOpptjeninger ?? []);
    const [selected, setSelected] = useState<OpptjeningUtland | undefined>(undefined);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <OpptjeningUtlandList
                opptjeninger={items}
                onEdit={(opptjening) => {
                    setSelected(opptjening);
                    setOpen(true);
                }}
                onDelete={(opptjening) => setItems(items.filter((o) => o.id !== opptjening.id))}
            />
            <button
                type="button"
                onClick={() => {
                    setSelected(undefined);
                    setOpen(true);
                }}>
                Legg til jobb i utlandet
            </button>
            <OpptjeningUtlandFormDialog
                isOpen={open}
                opptjening={selected}
                minDate={today.subtract(3, 'year').toDate()}
                maxDate={today.toDate()}
                onCancel={() => {
                    setOpen(false);
                    setSelected(undefined);
                }}
                onValidSubmit={(opptjening) => {
                    setItems(
                        selected
                            ? items.map((o) => (o.id === opptjening.id ? opptjening : o))
                            : [...items, opptjening],
                    );
                    setOpen(false);
                    setSelected(undefined);
                }}
            />
        </div>
    );
}

const meta = {
    title: 'Dialogs/OpptjeningUtland/ListAndDialog',
    component: OpptjeningUtlandListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        opptjeninger: exampleOpptjeninger,
    },
} satisfies Meta<typeof OpptjeningUtlandListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        opptjeninger: [],
    },
};
