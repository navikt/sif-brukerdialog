import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { FosterbarnListAndDialog } from './FosterbarnListAndDialog';
import type { Fosterbarn } from './index';

const exampleFosterbarn: Fosterbarn[] = [
    { id: '1', fødselsnummer: '01010112345', navn: 'Per Olsen' },
    { id: '2', fødselsnummer: '02020212345', navn: 'Kari Nordmann' },
];

type StoryProps = {
    fosterbarn?: Fosterbarn[];
};

function FosterbarnListAndDialogStory({ fosterbarn }: StoryProps) {
    const [items, setItems] = useState(fosterbarn);

    return (
        <FosterbarnListAndDialog
            fosterbarn={items}
            disallowedFødselsnumre={['01010112345', '02020212345']}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.fosterbarn.dialog.leggTilKnapp" />}
            onChange={setItems}
        />
    );
}

const meta = {
    title: 'Dialogs/Fosterbarn/ListAndDialog',
    component: FosterbarnListAndDialogStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        fosterbarn: exampleFosterbarn,
    },
} satisfies Meta<typeof FosterbarnListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        fosterbarn: [],
    },
};
