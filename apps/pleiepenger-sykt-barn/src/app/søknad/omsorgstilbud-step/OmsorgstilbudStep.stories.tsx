import { Meta, StoryObj } from '@storybook/react-vite';

import { søknadsdata } from '../../../storybook/data/søknadsdata';
import { withStepWrapper } from '../../../storybook/decorators';
import OmsorgstilbudStep from './OmsorgstilbudStep';

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
