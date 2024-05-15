import { Meta, StoryObj } from '@storybook/react';
import { withStepWrapper } from '../../../storybook/decorators';
import NattevåkOgBeredskapStep from './NattevåkOgBeredskapStep';

const meta: Meta<typeof NattevåkOgBeredskapStep> = {
    title: 'Step/NattevåkOgBeredskapStep',
    component: NattevåkOgBeredskapStep,
    decorators: [withStepWrapper],
};

export default meta;

type Story = StoryObj<typeof NattevåkOgBeredskapStep>;

export const Default: Story = {
    args: {},
};
