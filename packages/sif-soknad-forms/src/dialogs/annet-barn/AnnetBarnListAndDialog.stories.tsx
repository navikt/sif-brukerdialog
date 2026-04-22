import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { AnnetBarnListAndDialog } from './AnnetBarnListAndDialog';
import { AnnetBarn, BarnType } from './index';

type StoryProps = {
    annetBarn?: AnnetBarn[];
};

const today = dayjs();
const disallowedFødselsnumre = ['01010112345', '02020212345'];

const exampleBarn: AnnetBarn[] = [
    {
        id: '1',
        navn: 'Pia Hansen',
        fnr: '02489135879',
        fødselsdato: today.subtract(6, 'year').toDate(),
        type: BarnType.fosterbarn,
    },
    {
        id: '2',
        navn: 'Ola Hansen',
        fnr: '26492089450',
        fødselsdato: today.subtract(9, 'year').toDate(),
        type: BarnType.annet,
    },
];

function AnnetBarnListAndDialogStory({ annetBarn }: StoryProps) {
    const [items, setItems] = useState(annetBarn);

    return (
        <AnnetBarnListAndDialog
            annetBarn={items}
            minDate={today.subtract(18, 'year').toDate()}
            maxDate={today.toDate()}
            disallowedFødselsnumre={disallowedFødselsnumre}
            aldersgrenseText="(må være under 18 år)"
            showBarnTypeOptions
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.annetBarn.list.leggTil" />}
            onChange={setItems}
        />
    );
}

const meta = {
    title: 'Dialogs/AnnetBarn/ListAndDialog',
    component: AnnetBarnListAndDialogStory,
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
        annetBarn: exampleBarn,
    },
} satisfies Meta<typeof AnnetBarnListAndDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TomListe: Story = {
    args: {
        annetBarn: [],
    },
};
