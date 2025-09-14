import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import Process from './Process';
import ProcessStep from './ProcessStep';

import type { Meta, StoryObj } from '@storybook/react-vite';
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
            <ProcessStep index={1} key={1}>
                Steg 1
            </ProcessStep>,
            <ProcessStep index={2} key={2}>
                Steg 2
            </ProcessStep>,
            <ProcessStep index={3} key={3}>
                Steg 3
            </ProcessStep>,
        ],
    },
};
