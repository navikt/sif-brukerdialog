import { Meta, StoryObj } from '@storybook/react';
import { withStepWrapper } from '../../../storybook/decorators';
import MedlemsskapStep from './MedlemsskapStep';

const meta: Meta<typeof MedlemsskapStep> = {
    title: 'Step/MedlemsskapStep',
    component: MedlemsskapStep,
    decorators: [withStepWrapper],
};

export default meta;

type Story = StoryObj<typeof MedlemsskapStep>;

export const Default: Story = {
    args: {},
};
