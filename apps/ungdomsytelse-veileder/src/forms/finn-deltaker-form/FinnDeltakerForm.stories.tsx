import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import FinnDeltakerForm from './FinnDeltakerForm';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import { withDarkBg } from '../../../storybook/decorators/withDarkBg';

const meta: Meta<typeof FinnDeltakerForm> = {
    component: FinnDeltakerForm,
    title: 'Forms/Finn deltaker',
    parameters: {},
    decorators: [withPageWidth, withDarkBg, withIntl, withVeilederContext],
};
export default meta;

type Story = StoryObj<typeof FinnDeltakerForm>;

export const Default: Story = {
    // args: { veileder: parsedVeilederMock, deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};
