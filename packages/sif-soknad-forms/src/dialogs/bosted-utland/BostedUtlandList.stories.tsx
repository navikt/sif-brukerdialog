import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { BostedUtlandList } from './BostedUtlandList';
import type { BostedUtland } from './index';

type StoryProps = {
    bosteder: BostedUtland[];
    withActions?: boolean;
};

const exampleBosteder: BostedUtland[] = [
    {
        id: '1',
        landkode: 'SWE',
        landnavn: 'Sverige',
        periode: {
            from: new Date('2024-01-01'),
            to: new Date('2024-03-31'),
        },
    },
    {
        id: '2',
        landkode: 'DNK',
        landnavn: 'Danmark',
        periode: {
            from: new Date('2024-05-01'),
            to: new Date('2024-06-15'),
        },
    },
];

function BostedUtlandListStory({ bosteder, withActions = false }: StoryProps) {
    const [items, setItems] = useState(bosteder);

    return (
        <BostedUtlandList
            bosteder={items}
            onDelete={withActions ? (bosted) => setItems(items.filter((item) => item.id !== bosted.id)) : undefined}
            onEdit={withActions ? () => undefined : undefined}
        />
    );
}

const meta = {
    title: 'Dialogs/BostedUtland/List',
    component: BostedUtlandListStory,
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
        bosteder: exampleBosteder,
        withActions: false,
    },
} satisfies Meta<typeof BostedUtlandListStory>;

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
        bosteder: [],
    },
};
