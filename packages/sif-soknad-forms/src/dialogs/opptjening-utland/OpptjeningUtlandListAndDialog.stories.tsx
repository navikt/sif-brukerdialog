import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { OpptjeningAktivitet, type OpptjeningUtland } from './index';
import { OpptjeningUtlandListAndDialog } from './OpptjeningUtlandListAndDialog';

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

function OpptjeningUtlandListAndDialogStory({ opptjeninger }: StoryProps) {
    const [items, setItems] = useState(opptjeninger);

    return (
        <OpptjeningUtlandListAndDialog
            opptjeninger={items}
            minDate={today.subtract(3, 'year').toDate()}
            maxDate={today.toDate()}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.opptjeningUtland.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
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
