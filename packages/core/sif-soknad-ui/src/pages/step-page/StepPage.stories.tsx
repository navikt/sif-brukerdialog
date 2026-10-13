import { BodyLong } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorybookDecorator } from '../../storybook/StorybookDecorator';
import { StepPage } from './StepPage';

const meta: Meta<typeof StepPage> = {
    title: 'Pages/StepPage',
    component: StepPage,
    decorators: [StorybookDecorator],
};

export default meta;

type Story = StoryObj<typeof StepPage>;

const steps = [
    { id: 'steg-1', index: 0, label: 'Om deg', completed: true },
    { id: 'steg-2', index: 1, label: 'Om barnet', completed: false },
    { id: 'steg-3', index: 2, label: 'Oppsummering', completed: false },
];

export const Default: Story = {
    name: 'StepPage',
    args: {
        applicationTitle: 'Tittel på søknad',
        documentTitle: 'Om barnet',
        stepId: 'steg-2',
        steps,
        onStepSelect: () => undefined,
        children: <BodyLong>Innhold i steget.</BodyLong>,
    },
};

export const WithAbortAndResume: Story = {
    name: 'StepPage – med avbryt og fortsett senere',
    args: {
        ...Default.args,
        onAbort: () => undefined,
        onResumeLater: () => undefined,
    },
};
