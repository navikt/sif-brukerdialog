import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { FraværDagerListAndDialog } from './FraværDagerListAndDialog';
import { FraværPeriodeListAndDialog } from './FraværPeriodeListAndDialog';
import type { FraværDag, FraværPeriode } from './index';

const today = dayjs();

const examplePerioder: FraværPeriode[] = [
    {
        id: '1',
        fraOgMed: today.subtract(3, 'month').toDate(),
        tilOgMed: today.subtract(3, 'month').add(4, 'day').toDate(),
    },
];

const exampleDager: FraværDag[] = [
    { id: '1', dato: today.subtract(2, 'month').toDate(), timerArbeidsdag: '7.5', timerFravær: '3' },
];

type StoryProps = {
    fraværPerioder?: FraværPeriode[];
    fraværDager?: FraværDag[];
};

function FraværListAndDialogStory({ fraværPerioder, fraværDager }: StoryProps) {
    const [perioder, setPerioder] = useState(fraværPerioder);
    const [dager, setDager] = useState(fraværDager);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <h3>Perioder med fravær</h3>
                <FraværPeriodeListAndDialog
                    fraværPerioder={perioder}
                    minDate={today.subtract(1, 'year').toDate()}
                    maxDate={today.toDate()}
                    helgedagerIkkeTillat={true}
                    addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.fraværPeriode.dialog.leggTilKnapp" />}
                    onChange={setPerioder}
                />
            </div>
            <div>
                <h3>Dager med delvis fravær</h3>
                <FraværDagerListAndDialog
                    fraværDager={dager}
                    minDate={today.subtract(1, 'year').toDate()}
                    maxDate={today.toDate()}
                    helgedagerIkkeTillatt={true}
                    addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.fraværDag.dialog.leggTilKnapp" />}
                    onChange={setDager}
                />
            </div>
        </div>
    );
}

const meta = {
    title: 'Dialogs/Fravær/ListAndDialog',
    component: FraværListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        fraværPerioder: examplePerioder,
        fraværDager: exampleDager,
    },
} satisfies Meta<typeof FraværListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        fraværPerioder: [],
        fraværDager: [],
    },
};
