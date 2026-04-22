import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { type Virksomhet } from './index';
import { nyoppstartetVirksomhet, pågåendeVirksomhet, virksomhetMedVarigEndring } from './mockData';
import { VirksomhetSummary } from './VirksomhetSummary';

type StoryProps = {
    virksomhet: Virksomhet;
    harFlereVirksomheter?: boolean;
};

function VirksomhetSummaryStory(props: StoryProps) {
    return <VirksomhetSummary {...props} />;
}

const meta = {
    title: 'Dialogs/Virksomhet/Summary',
    component: VirksomhetSummaryStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={400}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        virksomhet: pågåendeVirksomhet,
    },
} satisfies Meta<typeof VirksomhetSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pågående: Story = {};

export const Nyoppstartet: Story = {
    args: {
        virksomhet: nyoppstartetVirksomhet,
        harFlereVirksomheter: true,
    },
};

export const MedVarigEndring: Story = {
    args: {
        virksomhet: virksomhetMedVarigEndring,
    },
};
