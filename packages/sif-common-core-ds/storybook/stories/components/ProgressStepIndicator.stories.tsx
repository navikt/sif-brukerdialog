import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ProgressStepper, { ProgressStep } from '../../../src/components/progress-stepper/ProgressStepper';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/ProgressStepper',
    component: ProgressStepper,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof ProgressStepper>;

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

const Template: ComponentStory<typeof ProgressStepper> = () => {
    return <ProgressStepper steps={steps} currentStepIndex={2} onStepSelect={() => null} />;
};

export const Default = Template.bind({});
