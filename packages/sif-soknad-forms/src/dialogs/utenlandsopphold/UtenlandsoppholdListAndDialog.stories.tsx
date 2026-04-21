import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { type Utenlandsopphold, UtenlandsoppholdÅrsak, type UtenlandsoppholdVariant } from './index';
import { UtenlandsoppholdListAndDialog } from './UtenlandsoppholdListAndDialog';

const today = dayjs();

const exampleOppholdEnkel: Utenlandsopphold[] = [
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

const exampleOppholdUtvidet: Utenlandsopphold[] = [
    {
        id: '1',
        type: 'innenfor_eøs',
        erUtenforEØS: false,
        fom: today.subtract(5, 'month').toDate(),
        tom: today.subtract(4, 'month').toDate(),
        landkode: 'SWE',
        erSammenMedBarnet: true,
    },
    {
        id: '2',
        type: 'utenfor_eøs',
        erUtenforEØS: true,
        fom: today.subtract(2, 'month').toDate(),
        tom: today.subtract(1, 'month').toDate(),
        landkode: 'USA',
        erSammenMedBarnet: true,
        erBarnetInnlagt: true,
        barnInnlagtPerioder: [
            {
                id: '2-1',
                fom: today.subtract(2, 'month').add(4, 'day').toDate(),
                tom: today.subtract(2, 'month').add(9, 'day').toDate(),
            },
        ],
        årsak: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
    },
];

type StoryProps = {
    opphold?: Utenlandsopphold[];
    variant: UtenlandsoppholdVariant;
};

function UtenlandsoppholdListAndDialogStory({ opphold, variant }: StoryProps) {
    const [items, setItems] = useState(opphold);

    return (
        <UtenlandsoppholdListAndDialog
            opphold={items}
            minDate={today.subtract(1, 'year').toDate()}
            maxDate={today.add(1, 'year').toDate()}
            variant={variant}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.utenlandsopphold.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
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
    argTypes: {
        variant: {
            control: 'radio',
            options: ['enkel', 'utvidet'],
        },
    },
    args: {
        opphold: exampleOppholdEnkel,
        variant: 'enkel',
    },
} satisfies Meta<typeof UtenlandsoppholdListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Enkel: Story = {};

export const Utvidet: Story = {
    args: {
        opphold: exampleOppholdUtvidet,
        variant: 'utvidet',
    },
};

export const TomListe: Story = {
    args: {
        opphold: [],
    },
};

export const TomListeUtvidet: Story = {
    args: {
        opphold: [],
        variant: 'utvidet',
    },
};
