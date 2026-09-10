import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { ArbeidUtlandListAndDialog } from './ArbeidUtlandListAndDialog';
import type { ArbeidUtland } from './index';
import { dateToISODate } from '@sif/utils';

type StoryProps = {
    arbeidssteder?: ArbeidUtland[];
};

const today = dayjs();

const exampleArbeider: ArbeidUtland[] = [
    {
        id: '1',
        landkode: 'SWE',
        landnavn: 'Sverige',
        periode: {
            from: dateToISODate(today.subtract(8, 'month')),
            to: dateToISODate(today.subtract(6, 'month').subtract(10, 'day')),
        },
        jobbetIPerioden: true,
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
        jobbetIPerioden: true,
        identitetsnummer: undefined,
    },
];

function ArbeidUtlandListAndDialogStory({ arbeidssteder }: StoryProps) {
    const [items, setItems] = useState(arbeidssteder);

    return (
        <ArbeidUtlandListAndDialog
            minDate={dateToISODate(today.subtract(1, 'year'))}
            maxDate={dateToISODate(today.add(1, 'year'))}
            arbeidssteder={items}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta: Meta<typeof ArbeidUtlandListAndDialogStory> = {
    title: 'Dialogs/ArbeidUtland/ListAndDialog',
    component: ArbeidUtlandListAndDialogStory,
    decorators: [
        (Story) => {
            return (
                <StoryFrame maxWidth={720} minHeight={700}>
                    <Story />
                </StoryFrame>
            );
        },
    ],
    args: {
        arbeidssteder: exampleArbeider,
    },
} satisfies Meta<typeof ArbeidUtlandListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        arbeidssteder: [],
    },
};
