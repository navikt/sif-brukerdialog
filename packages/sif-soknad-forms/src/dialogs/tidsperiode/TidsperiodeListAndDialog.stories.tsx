import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { TidsperiodeListAndDialog } from './TidsperiodeListAndDialog';
import type { DateTidsperiode } from './index';

const today = dayjs();

const exampleTidsperioder: DateTidsperiode[] = [
    {
        id: '1',
        fom: today.subtract(6, 'month').toDate(),
        tom: today.subtract(4, 'month').toDate(),
    },
];

type StoryProps = {
    tidsperioder?: DateTidsperiode[];
};

function TidsperiodeListAndDialogStory({ tidsperioder }: StoryProps) {
    const [items, setItems] = useState(tidsperioder);

    return (
        <TidsperiodeListAndDialog
            tidsperioder={items}
            minDate={today.subtract(1, 'year').toDate()}
            maxDate={today.add(1, 'year').toDate()}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.tidsperiode.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta = {
    title: 'Dialogs/Tidsperiode/ListAndDialog',
    component: TidsperiodeListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        tidsperioder: exampleTidsperioder,
    },
} satisfies Meta<typeof TidsperiodeListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        tidsperioder: [],
    },
};
