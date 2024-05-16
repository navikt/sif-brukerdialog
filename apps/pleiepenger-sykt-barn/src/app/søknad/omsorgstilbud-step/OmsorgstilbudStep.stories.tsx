import { Meta, StoryObj } from '@storybook/react';
import OmsorgstilbudStep from './OmsorgstilbudStep';
import { withStepWrapper } from '../../../storybook/decorators';
import { søknadsdata } from '../../../storybook/data/søknadsdata';

const meta: Meta<typeof OmsorgstilbudStep> = {
    title: 'Step/OmsorgstilbudStep',
    component: OmsorgstilbudStep,
    decorators: [withStepWrapper],
    args: {
        søknadsperiode: søknadsdata.søknadsperiode,
    },
};

export default meta;

type Story = StoryObj<typeof OmsorgstilbudStep>;

export const Default: Story = {
    args: {},
};
