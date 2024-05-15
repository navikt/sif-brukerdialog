import { Meta, StoryObj } from '@storybook/react';
import { withStepWrapper } from '../../../storybook/decorators';
import OppsummeringStep from './OppsummeringStep';
import { formikValues } from '../../../storybook/data/formikValues';

const meta: Meta<typeof OppsummeringStep> = {
    title: 'Step/OppsummeringStep',
    component: OppsummeringStep,
    decorators: [withStepWrapper],
    args: {
        søknadsdato: new Date(),
        values: formikValues,
    },
};

export default meta;

type Story = StoryObj<typeof OppsummeringStep>;

export const Default: Story = {
    args: {},
};
