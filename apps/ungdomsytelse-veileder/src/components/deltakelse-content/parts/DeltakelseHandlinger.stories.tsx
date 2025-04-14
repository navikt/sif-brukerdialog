import type { Meta, StoryObj } from '@storybook/react';
import { parsedMockDeltakelse, parsedMockDeltaker } from '../../../../mock/msw/mocks/mockUtils';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import DeltakelseHandlinger from './DeltakelseHandlinger';
import { withVeilederContext } from '../../../../storybook/decorators/withVeilederContext';

const meta: Meta<typeof DeltakelseHandlinger> = {
    component: DeltakelseHandlinger,
    title: 'Deltakelse/Handlinger',
    parameters: {},
    decorators: [withPageWidth, withIntl, withVeilederContext],
};
export default meta;

type Story = StoryObj<typeof DeltakelseHandlinger>;

export const Default: Story = {
    args: { deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};
