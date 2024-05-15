import { Meta, StoryObj } from '@storybook/react';
import ArbeidstidStep from './ArbeidstidStep';
import { withStepWrapper } from '../../../storybook/decorators';

const meta: Meta<typeof ArbeidstidStep> = {
    title: 'Step/ArbeidstidStep',
    component: ArbeidstidStep,
    decorators: [withStepWrapper],
};

export default meta;

type Story = StoryObj<typeof ArbeidstidStep>;

export const Default: Story = {
    args: {},
};
