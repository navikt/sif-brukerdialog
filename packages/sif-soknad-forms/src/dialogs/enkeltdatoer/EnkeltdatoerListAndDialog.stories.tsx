import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { EnkeltdatoFormDialog } from './EnkeltdatoDialog';
import { EnkeltdatoList } from './EnkeltdatoList';
import type { Enkeltdato } from './index';

const today = dayjs();

const exampleEnkeltdatoer: Enkeltdato[] = [
    { id: '1', dato: today.subtract(10, 'day').toDate() },
    { id: '2', dato: today.subtract(3, 'day').toDate() },
];

type StoryProps = {
    enkeltdatoer?: Enkeltdato[];
};

function EnkeltdatoerListAndDialogStory({ enkeltdatoer: initialDatoer }: StoryProps) {
    const [items, setItems] = useState(initialDatoer ?? []);
    const [selected, setSelected] = useState<Enkeltdato | undefined>(undefined);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <EnkeltdatoList
                enkeltdatoer={items}
                onEdit={(dato) => {
                    setSelected(dato);
                    setOpen(true);
                }}
                onDelete={(dato) => setItems(items.filter((d) => d.id !== dato.id))}
            />
            <button
                type="button"
                onClick={() => {
                    setSelected(undefined);
                    setOpen(true);
                }}>
                Legg til dato
            </button>
            <EnkeltdatoFormDialog
                isOpen={open}
                enkeltdato={selected}
                alleEnkeltdatoer={items}
                minDate={today.subtract(1, 'year').toDate()}
                maxDate={today.toDate()}
                onCancel={() => {
                    setOpen(false);
                    setSelected(undefined);
                }}
                onValidSubmit={(dato) => {
                    setItems(selected ? items.map((d) => (d.id === dato.id ? dato : d)) : [...items, dato]);
                    setOpen(false);
                    setSelected(undefined);
                }}
            />
        </div>
    );
}

const meta = {
    title: 'Dialogs/Enkeltdatoer/ListAndDialog',
    component: EnkeltdatoerListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        enkeltdatoer: exampleEnkeltdatoer,
    },
} satisfies Meta<typeof EnkeltdatoerListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        enkeltdatoer: [],
    },
};
