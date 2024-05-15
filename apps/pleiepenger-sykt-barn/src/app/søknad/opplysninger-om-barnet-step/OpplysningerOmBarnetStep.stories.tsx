import { Meta, StoryObj } from '@storybook/react';
import { withStepWrapper } from '../../../storybook/decorators';
import OpplysningerOmBarnetStep from './OpplysningerOmBarnetStep';

const meta: Meta<typeof OpplysningerOmBarnetStep> = {
    title: 'Step/OpplysningerOmBarnetStep',
    component: OpplysningerOmBarnetStep,
    decorators: [withStepWrapper],
};

export default meta;

type Story = StoryObj<typeof OpplysningerOmBarnetStep>;

export const Default: Story = {
    args: {},
};
