import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ProgressStepIndicator, {
    ProgressStep,
} from '../../../src/components/progress-step-indicator/ProgressStepIndicator';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/ProgressStepIndicator',
    component: ProgressStepIndicator,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof ProgressStepIndicator>;

const steps: ProgressStep[] = [
    {
        id: 'steg1',
        title: 'Om barnet',
        completed: true,
    },
    {
        id: 'steg2',
        title: 'Periode',
        completed: true,
    },
    {
        id: 'steg3',
        title: 'Arbeidssituasjon',
    },
    {
        id: 'steg4',
        title: 'Arbeid i perioden',
    },
    {
        id: 'steg5',
        title: 'Omsorgstilbud',
    },
    {
        id: 'steg6',
        title: 'Nattevåk og beredskap',
    },
    {
        id: 'steg7',
        title: 'Medlemsskap',
    },
    {
        id: 'steg7',
        title: 'Oppsummering',
    },
];

const Template: ComponentStory<typeof ProgressStepIndicator> = () => {
    return <ProgressStepIndicator steps={steps} currentStepIndex={2} />;
};

export const Default = Template.bind({});
