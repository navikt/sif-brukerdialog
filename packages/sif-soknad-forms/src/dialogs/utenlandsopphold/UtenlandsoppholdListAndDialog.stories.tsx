import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { UtenlandsoppholdListAndDialog } from './UtenlandsoppholdListAndDialog';
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

function UtenlandsoppholdListAndDialogStory({ opphold }: StoryProps) {
    const [items, setItems] = useState(opphold);

    return (
        <UtenlandsoppholdListAndDialog
            opphold={items}
            minDate={today.subtract(1, 'year').toDate()}
            maxDate={today.add(1, 'year').toDate()}
            variant="enkel"
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
