import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { OpptjeningAktivitet, type OpptjeningUtland } from './index';
import { OpptjeningUtlandListAndDialog } from './OpptjeningUtlandListAndDialog';
import { dateToISODate } from '@sif/utils';

const today = dayjs();

const exampleOpptjeninger: OpptjeningUtland[] = [
    {
        id: '1',
        fom: dateToISODate(today.subtract(2, 'year')),
        tom: dateToISODate(today.subtract(1, 'year').subtract(1, 'day')),
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
            minDate={dateToISODate(today.subtract(3, 'year'))}
            maxDate={dateToISODate(today)}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.opptjeningUtland.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta: Meta<typeof OpptjeningUtlandListAndDialogStory> = {
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
