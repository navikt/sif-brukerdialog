import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { withIntlWrapper, withStoryWrapper } from '../../../storybook/decorators';
import ProgressStepper, { ProgressStep } from './ProgressStepper';

export default {
    title: 'Components/ProgressStepper',
    component: ProgressStepper,
    decorators: [withStoryWrapper, withIntlWrapper],
} as Meta<typeof ProgressStepper>;

const steps: ProgressStep[] = [
    {
        index: 0,
        id: 'steg1',
        label: 'Om barnet',
        completed: true,
    },
    {
        index: 1,
        id: 'steg2',
        label: 'Periode',
        completed: true,
    },
    {
        index: 2,
        id: 'steg3',
        label: 'Arbeidssituasjon',
    },
    {
        index: 3,
        id: 'steg4',
        label: 'Arbeid i perioden',
    },
    {
        index: 4,
        id: 'steg5',
        label: 'Omsorgstilbud',
    },
    {
        index: 5,
        id: 'steg6',
        label: 'Nattevåk og beredskap',
    },
    {
        index: 6,
        id: 'steg7',
        label: 'Medlemsskap',
    },
    {
        index: 7,
        id: 'steg7',
        label: 'Oppsummering',
    },
];

const Template: StoryFn<typeof ProgressStepper> = () => {
    return <ProgressStepper steps={steps} currentStepIndex={2} onStepSelect={() => null} />;
};

export const Default = Template.bind({});
