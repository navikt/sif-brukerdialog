import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { FosterbarnFormDialog } from './FosterbarnDialog';
import { FosterbarnList } from './FosterbarnList';
import type { Fosterbarn } from './index';

const exampleFosterbarn: Fosterbarn[] = [
    { id: '1', fødselsnummer: '01010112345', navn: 'Per Olsen' },
    { id: '2', fødselsnummer: '02020212345', navn: 'Kari Nordmann' },
];

type StoryProps = {
    fosterbarn?: Fosterbarn[];
};

function FosterbarnListAndDialogStory({ fosterbarn: initialBarn }: StoryProps) {
    const [items, setItems] = useState(initialBarn ?? []);
    const [selected, setSelected] = useState<Fosterbarn | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const disallowedFødselsnumre = items
        .filter((b) => b.id !== selected?.id)
        .map((b) => b.fødselsnummer);

    return (
        <div>
            <FosterbarnList
                fosterbarn={items}
                onEdit={(barn) => {
                    setSelected(barn);
                    setOpen(true);
                }}
                onDelete={(barn) => setItems(items.filter((b) => b.id !== barn.id))}
            />
            <button
                type="button"
                onClick={() => {
                    setSelected(undefined);
                    setOpen(true);
                }}>
                Legg til fosterbarn
            </button>
            <FosterbarnFormDialog
                isOpen={open}
                fosterbarn={selected}
                disallowedFødselsnumre={disallowedFødselsnumre}
                onCancel={() => {
                    setOpen(false);
                    setSelected(undefined);
                }}
                onValidSubmit={(barn) => {
                    setItems(selected ? items.map((b) => (b.id === barn.id ? barn : b)) : [...items, barn]);
                    setOpen(false);
                    setSelected(undefined);
                }}
            />
        </div>
    );
}

const meta = {
    title: 'Dialogs/Fosterbarn/ListAndDialog',
    component: FosterbarnListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        fosterbarn: exampleFosterbarn,
    },
} satisfies Meta<typeof FosterbarnListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        fosterbarn: [],
    },
};
