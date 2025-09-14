import { Meta, StoryObj } from '@storybook/react-vite';

import { withStepWrapper } from '../../../storybook/decorators';
import ArbeidstidStep from './ArbeidstidStep';

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
