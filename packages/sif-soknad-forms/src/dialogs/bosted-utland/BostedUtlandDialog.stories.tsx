import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { BostedUtlandFormDialog } from './BostedUtlandDialog';
import type { BostedUtland } from './index';
import { dateToISODate } from '@sif/utils';

type StoryProps = {
    bosted?: BostedUtland;
    alleBosteder?: BostedUtland[];
};

const today = dayjs();

const alleBosteder: BostedUtland[] = [
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

function BostedUtlandDialogStory(props: StoryProps) {
    const [open, setOpen] = useState(true);

    return (
        <>
            {!open && (
                <button type="button" onClick={() => setOpen(true)}>
                    Åpne dialog
                </button>
            )}
            <BostedUtlandFormDialog
                isOpen={open}
                minDate={dateToISODate(today.subtract(1, 'year'))}
                maxDate={dateToISODate(today.add(1, 'year'))}
                bosted={props.bosted}
                alleBosteder={props.alleBosteder}
                onCancel={() => setOpen(false)}
                onValidSubmit={() => setOpen(false)}
            />
        </>
    );
}

const meta: Meta<typeof BostedUtlandDialogStory> = {
    title: 'Dialogs/BostedUtland/Dialog',
    component: BostedUtlandDialogStory,
    decorators: [
        (Story) => {
            return (
                <StoryFrame minHeight={700}>
                    <Story />
                </StoryFrame>
            );
        },
    ],
    args: {
        alleBosteder,
    },
} satisfies Meta<typeof BostedUtlandDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NyttBosted: Story = {};

export const RedigerBosted: Story = {
    args: {
        bosted: alleBosteder[0],
        alleBosteder,
    },
};
