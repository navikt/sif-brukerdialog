import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { RapporterInntektForm } from './RapporterInntektForm';

const meta = {
    title: 'Forms/RapporterInntektForm',
    component: RapporterInntektForm,
    decorators: [StorybookDecorator, OppgavePageDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        oppgaveYtelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
        oppgaveReferanse: 'test-ref-123',
        måned: 'januar 2026',
        onSuccess: fn(),
    },
} satisfies Meta<typeof RapporterInntektForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
