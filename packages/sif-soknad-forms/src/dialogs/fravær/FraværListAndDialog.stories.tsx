import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { FraværDagFormDialog, FraværPeriodeFormDialog } from './FraværDialog';
import { FraværDagerList, FraværPerioderList } from './FraværList';
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

function FraværListAndDialogStory({ fraværPerioder: initialPerioder, fraværDager: initialDager }: StoryProps) {
    const [perioder, setPerioder] = useState(initialPerioder ?? []);
    const [dager, setDager] = useState(initialDager ?? []);
    const [selectedPeriode, setSelectedPeriode] = useState<FraværPeriode | undefined>(undefined);
    const [selectedDag, setSelectedDag] = useState<FraværDag | undefined>(undefined);
    const [periodeOpen, setPeriodeOpen] = useState(false);
    const [dagOpen, setDagOpen] = useState(false);

    const dagDateRanges = dager.map((d) => ({ from: d.dato, to: d.dato }));
    const periodeDateRanges = perioder.map((p) => ({ from: p.fraOgMed, to: p.tilOgMed }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <h3>Perioder med fravær</h3>
                <FraværPerioderList
                    fraværPerioder={perioder}
                    onEdit={(periode) => {
                        setSelectedPeriode(periode);
                        setPeriodeOpen(true);
                    }}
                    onDelete={(periode) => setPerioder(perioder.filter((p) => p.id !== periode.id))}
                />
                <button
                    type="button"
                    onClick={() => {
                        setSelectedPeriode(undefined);
                        setPeriodeOpen(true);
                    }}>
                    Legg til fraværsperiode
                </button>
            </div>
            <div>
                <h3>Dager med delvis fravær</h3>
                <FraværDagerList
                    fraværDager={dager}
                    onEdit={(dag) => {
                        setSelectedDag(dag);
                        setDagOpen(true);
                    }}
                    onDelete={(dag) => setDager(dager.filter((d) => d.id !== dag.id))}
                />
                <button
                    type="button"
                    onClick={() => {
                        setSelectedDag(undefined);
                        setDagOpen(true);
                    }}>
                    Legg til fraværsdag
                </button>
            </div>
            <FraværPeriodeFormDialog
                isOpen={periodeOpen}
                fraværPeriode={selectedPeriode}
                minDate={today.subtract(1, 'year').toDate()}
                maxDate={today.toDate()}
                dateRangesToDisable={dagDateRanges}
                helgedagerIkkeTillat={true}
                onCancel={() => {
                    setPeriodeOpen(false);
                    setSelectedPeriode(undefined);
                }}
                onValidSubmit={(periode) => {
                    setPerioder(
                        selectedPeriode
                            ? perioder.map((p) => (p.id === periode.id ? periode : p))
                            : [...perioder, periode],
                    );
                    setPeriodeOpen(false);
                    setSelectedPeriode(undefined);
                }}
            />
            <FraværDagFormDialog
                isOpen={dagOpen}
                fraværDag={selectedDag}
                minDate={today.subtract(1, 'year').toDate()}
                maxDate={today.toDate()}
                dateRangesToDisable={periodeDateRanges}
                helgedagerIkkeTillatt={true}
                onCancel={() => {
                    setDagOpen(false);
                    setSelectedDag(undefined);
                }}
                onValidSubmit={(dag) => {
                    setDager(
                        selectedDag ? dager.map((d) => (d.id === dag.id ? dag : d)) : [...dager, dag],
                    );
                    setDagOpen(false);
                    setSelectedDag(undefined);
                }}
            />
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
