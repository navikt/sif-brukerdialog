import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { ArbeidUtlandFormDialog } from './ArbeidUtlandDialog';
import type { ArbeidUtland } from './index';
import { dateToISODate } from '@sif/utils';

type StoryProps = {
    arbeidssted?: ArbeidUtland;
    alleArbeider?: ArbeidUtland[];
};

const today = dayjs();

const alleArbeider: ArbeidUtland[] = [
    {
        id: '1',
        landkode: 'SWE',
        landnavn: 'Sverige',
        periode: {
            from: dateToISODate(today.subtract(8, 'month')),
            to: dateToISODate(today.subtract(6, 'month').subtract(10, 'day')),
        },
        identitetsnummer: undefined,
    },
    {
        id: '2',
        landkode: 'DNK',
        landnavn: 'Danmark',
        periode: {
            from: dateToISODate(today.subtract(4, 'month')),
            to: dateToISODate(today.subtract(2, 'month').subtract(10, 'day')),
        },
        identitetsnummer: undefined,
    },
];

function ArbeidUtlandDialogStory(props: StoryProps) {
    const [open, setOpen] = useState(true);

    return (
        <>
            {!open && (
                <button type="button" onClick={() => setOpen(true)}>
                    Åpne dialog
                </button>
            )}
            <ArbeidUtlandFormDialog
                isOpen={open}
                minDate={dateToISODate(today.subtract(1, 'year'))}
                maxDate={dateToISODate(today.add(1, 'year'))}
                arbeidssted={props.arbeidssted}
                alleArbeider={props.alleArbeider}
                onCancel={() => setOpen(false)}
                onValidSubmit={() => setOpen(false)}
            />
        </>
    );
}

const meta: Meta<typeof ArbeidUtlandDialogStory> = {
    title: 'Dialogs/ArbeidUtland/Dialog',
    component: ArbeidUtlandDialogStory,
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
        alleArbeider,
    },
} satisfies Meta<typeof ArbeidUtlandDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NyttArbeid: Story = {};

export const RedigerArbeid: Story = {
    args: {
        arbeidssted: alleArbeider[0],
        alleArbeider,
    },
};
