import { Meta, StoryFn } from '@storybook/react-vite';

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
        completed: false,
    },
    {
        index: 3,
        id: 'steg4',
        label: 'Arbeid i perioden',
        completed: false,
    },
    {
        index: 4,
        id: 'steg5',
        label: 'Omsorgstilbud',
        completed: false,
    },
    {
        index: 5,
        id: 'steg6',
        label: 'Nattevåk og beredskap',
        completed: false,
    },
    {
        index: 6,
        id: 'steg7',
        label: 'Medlemsskap',
        completed: false,
    },
    {
        index: 7,
        id: 'steg7',
        label: 'Oppsummering',
        completed: false,
    },
];

const Template: StoryFn<typeof ProgressStepper> = () => {
    return <ProgressStepper steps={steps} currentStepIndex={2} onStepSelect={() => null} />;
};

export const Default = Template.bind({});
