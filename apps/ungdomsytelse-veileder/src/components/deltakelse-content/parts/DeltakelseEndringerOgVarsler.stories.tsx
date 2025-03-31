import type { Meta, StoryObj } from '@storybook/react';
import { parsedMockDeltakelse } from '../../../../mock/msw/mocks/mockUtils';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import DeltakelseEndringerOgVarsler from './DeltakelseEndringerOgVarsler';
import { withVeilederContext } from '../../../../storybook/decorators/withVeilederContext';

const meta: Meta<typeof DeltakelseEndringerOgVarsler> = {
    component: DeltakelseEndringerOgVarsler,
    title: 'Deltakelse/EndringerOgVarslinger',
    parameters: {},
    decorators: [withPageWidth, withIntl, withVeilederContext],
};
export default meta;

type Story = StoryObj<typeof DeltakelseEndringerOgVarsler>;

export const Default: Story = {
    args: { deltakelse: parsedMockDeltakelse },
};
