import Process from './Process';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import ProcessStep from './ProcessStep';

const meta: Meta<typeof Process> = {
    component: Process,
    title: 'Components/Process',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof Process>;

export const Default: Story = {
    args: {
        children: [
            <ProcessStep index={1}>Steg 1</ProcessStep>,
            <ProcessStep index={2}>Steg 2</ProcessStep>,
            <ProcessStep index={3}>Steg 3</ProcessStep>,
        ],
    },
};
