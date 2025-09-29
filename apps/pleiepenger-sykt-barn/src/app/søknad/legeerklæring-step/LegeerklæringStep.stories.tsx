import { Meta, StoryObj } from '@storybook/react-vite';

import { withStepWrapper } from '../../../storybook/decorators';
import LegeerklæringStep from './LegeerklæringStep';

const meta: Meta<typeof LegeerklæringStep> = {
    title: 'Step/LegeerklæringStep',
    component: LegeerklæringStep,
    decorators: [withStepWrapper],
};

export default meta;

type Story = StoryObj<typeof LegeerklæringStep>;

export const Default: Story = {
    args: {},
};
