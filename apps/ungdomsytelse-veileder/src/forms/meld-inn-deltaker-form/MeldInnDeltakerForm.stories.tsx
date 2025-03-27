import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import MeldInnDeltakerForm from './MeldInnDeltakerForm';

const meta: Meta<typeof MeldInnDeltakerForm> = {
    component: MeldInnDeltakerForm,
    title: 'Forms/Meld inn deltaker',
    parameters: {},
    decorators: [withPageWidth, withIntl, withVeilederContext],
};
export default meta;

type Story = StoryObj<typeof MeldInnDeltakerForm>;

export const Default: Story = {
    // args: { veileder: parsedVeilederMock, deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};
