import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { ArbeidUtlandList } from './ArbeidUtlandList';
import type { ArbeidUtland } from './index';
import { ISODate } from '@sif/utils';

type StoryProps = {
    arbeidssteder: ArbeidUtland[];
    withActions?: boolean;
};

const exampleArbeider: ArbeidUtland[] = [
    {
        id: '1',
        landkode: 'SWE',
        landnavn: 'Sverige',
        periode: {
            from: '2024-01-01' as ISODate,
            to: '2024-03-31' as ISODate,
        },
    },
    {
        id: '2',
        landkode: 'DNK',
        landnavn: 'Danmark',
        periode: {
            from: '2024-05-01' as ISODate,
            to: '2024-06-15' as ISODate,
        },
    },
];

function ArbeidUtlandListStory({ arbeidssteder, withActions = false }: StoryProps) {
    const [items, setItems] = useState(arbeidssteder);

    return (
        <ArbeidUtlandList
            arbeidssteder={items}
            onDelete={
                withActions ? (arbeidssted) => setItems(items.filter((item) => item.id !== arbeidssted.id)) : undefined
            }
            onEdit={withActions ? () => undefined : undefined}
        />
    );
}

const meta: Meta<typeof ArbeidUtlandListStory> = {
    title: 'Dialogs/ArbeidUtland/List',
    component: ArbeidUtlandListStory,
    decorators: [
        (Story) => {
            return (
                <StoryFrame maxWidth={720}>
                    <Story />
                </StoryFrame>
            );
        },
    ],
    args: {
        arbeidssteder: exampleArbeider,
        withActions: false,
    },
} satisfies Meta<typeof ArbeidUtlandListStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const MedHandlinger: Story = {
    args: {
        withActions: true,
    },
};

export const TomListe: Story = {
    args: {
        arbeidssteder: [],
    },
};
