import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { type UtenlandskNæring,UtenlandskNæringstype } from './index';
import { UtenlandskNæringListAndDialog } from './UtenlandskNæringListAndDialog';

const today = dayjs();

const exampleNæringer: UtenlandskNæring[] = [
    {
        id: '1',
        næringstype: UtenlandskNæringstype.FISKE,
        navnPåVirksomheten: 'Fiskebåten AS',
        land: 'SWE',
        fraOgMed: today.subtract(2, 'year').toDate(),
        tilOgMed: today.subtract(1, 'year').toDate(),
    },
];

type StoryProps = {
    næringer?: UtenlandskNæring[];
};

function UtenlandskNæringListAndDialogStory({ næringer }: StoryProps) {
    const [items, setItems] = useState(næringer);

    return (
        <UtenlandskNæringListAndDialog
            næringer={items}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.utenlandskNæring.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta = {
    title: 'Dialogs/UtenlandskNæring/ListAndDialog',
    component: UtenlandskNæringListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        næringer: exampleNæringer,
    },
} satisfies Meta<typeof UtenlandskNæringListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        næringer: [],
    },
};
