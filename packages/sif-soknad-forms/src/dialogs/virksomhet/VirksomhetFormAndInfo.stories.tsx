import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { type Virksomhet } from './index';
import { exampleVirksomhet } from './mockData';
import { VirksomhetFormAndInfo } from './VirksomhetFormAndInfo';

type StoryProps = {
    virksomhet?: Virksomhet;
};

function VirksomhetFormAndInfoStory({ virksomhet: initialVirksomhet }: StoryProps) {
    const [virksomhet, setVirksomhet] = useState(initialVirksomhet);

    return (
        <VirksomhetFormAndInfo
            virksomhet={virksomhet}
            labels={{
                infoTitle: 'Virksomhet',
                addLabel: 'Legg til',
                editLabel: 'Endre',
                deleteLabel: 'Slett',
            }}
            onChange={setVirksomhet}
        />
    );
}

const meta = {
    title: 'Dialogs/Virksomhet/FormAndInfo',
    component: VirksomhetFormAndInfoStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        virksomhet: exampleVirksomhet,
    },
} satisfies Meta<typeof VirksomhetFormAndInfoStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MedVirksomhet: Story = {};

export const UtenVirksomhet: Story = {
    args: {
        virksomhet: undefined,
    },
};
