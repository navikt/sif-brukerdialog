import type { Meta, StoryObj } from '@storybook/react';
import DeltakelseEndringerOgVarsler from '../parts/DeltakelseEndringerOgVarsler';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../../storybook/decorators/withVeilederContext';
import { parsedMockDeltakelse } from '../../../../mock/msw/mocks/mockUtils';

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
