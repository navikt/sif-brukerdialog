import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { EnkeltdatoerListAndDialog } from './EnkeltdatoerListAndDialog';
import type { Enkeltdato } from './index';
import { dateToISODate } from '@sif/utils';

const today = dayjs();

const exampleEnkeltdatoer: Enkeltdato[] = [
    { id: '1', dato: dateToISODate(today.subtract(10, 'day')) },
    { id: '2', dato: dateToISODate(today.subtract(3, 'day')) },
];

type StoryProps = {
    enkeltdatoer?: Enkeltdato[];
};

function EnkeltdatoerListAndDialogStory({ enkeltdatoer }: StoryProps) {
    const [items, setItems] = useState(enkeltdatoer);

    return (
        <EnkeltdatoerListAndDialog
            enkeltdatoer={items}
            minDate={dateToISODate(today.subtract(1, 'year'))}
            maxDate={dateToISODate(today)}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.enkeltdato.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta: Meta<typeof EnkeltdatoerListAndDialogStory> = {
    title: 'Dialogs/Enkeltdatoer/ListAndDialog',
    component: EnkeltdatoerListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        enkeltdatoer: exampleEnkeltdatoer,
    },
} satisfies Meta<typeof EnkeltdatoerListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        enkeltdatoer: [],
    },
};
