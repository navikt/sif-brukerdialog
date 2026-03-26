import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { InnsynAppDecorator } from '../../../stories/InnsynAppDecorator';
import { StorybookDecorator } from '../../../stories/StorybookDecorator';
import { RapporterInntektForm } from './RapporterInntektForm';

const meta = {
    title: 'Forms/RapporterInntektForm',
    component: RapporterInntektForm,
    decorators: [InnsynAppDecorator, StorybookDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        oppgaveReferanse: 'test-ref-123',
        måned: 'januar 2026',
        onSuccess: fn(),
        onCancel: fn(),
    },
} satisfies Meta<typeof RapporterInntektForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UtenAvbrytKnapp: Story = {
    args: {
        onCancel: undefined,
    },
};
