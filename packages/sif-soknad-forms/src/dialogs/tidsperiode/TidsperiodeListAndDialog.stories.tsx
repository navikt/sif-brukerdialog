import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { TidsperiodeFormDialog } from './TidsperiodeDialog';
import { TidsperiodeList } from './TidsperiodeList';
import type { DateTidsperiode } from './index';

const today = dayjs();

const exampleTidsperioder: DateTidsperiode[] = [
    {
        id: '1',
        fom: today.subtract(6, 'month').toDate(),
        tom: today.subtract(4, 'month').toDate(),
    },
];

type StoryProps = {
    tidsperioder?: DateTidsperiode[];
};

function TidsperiodeListAndDialogStory({ tidsperioder: initialTidsperioder }: StoryProps) {
    const [items, setItems] = useState(initialTidsperioder ?? []);
    const [selected, setSelected] = useState<DateTidsperiode | undefined>(undefined);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <TidsperiodeList
                tidsperioder={items}
                onEdit={(tidsperiode) => {
                    setSelected(tidsperiode);
                    setOpen(true);
                }}
                onDelete={(tidsperiode) => setItems(items.filter((t) => t.id !== tidsperiode.id))}
            />
            <button
                type="button"
                onClick={() => {
                    setSelected(undefined);
                    setOpen(true);
                }}>
                Legg til tidsperiode
            </button>
            <TidsperiodeFormDialog
                isOpen={open}
                tidsperiode={selected}
                alleTidsperioder={items}
                minDate={today.subtract(1, 'year').toDate()}
                maxDate={today.add(1, 'year').toDate()}
                onCancel={() => {
                    setOpen(false);
                    setSelected(undefined);
                }}
                onValidSubmit={(tidsperiode) => {
                    setItems(
                        selected
                            ? items.map((t) => (t.id === tidsperiode.id ? tidsperiode : t))
                            : [...items, tidsperiode],
                    );
                    setOpen(false);
                    setSelected(undefined);
                }}
            />
        </div>
    );
}

const meta = {
    title: 'Dialogs/Tidsperiode/ListAndDialog',
    component: TidsperiodeListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        tidsperioder: exampleTidsperioder,
    },
} satisfies Meta<typeof TidsperiodeListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        tidsperioder: [],
    },
};
