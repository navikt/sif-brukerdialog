import type { Meta, StoryObj } from '@storybook/react';

import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../../storybook/decorators/withVeilederContext';
import { parsedMockDeltakelse, parsedMockDeltaker } from '../../../../mock/msw/mocks/mockUtils';
import DeltakelseHandlinger from '../parts/DeltakelseHandlinger';
import { withQueryClientProvider } from '../../../../storybook/decorators/withQueryClientProvider';
import dayjs from 'dayjs';

const meta: Meta<typeof DeltakelseHandlinger> = {
    component: DeltakelseHandlinger,
    title: 'Deltakelse/Handlinger',
    parameters: {},
    decorators: [withPageWidth, withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof DeltakelseHandlinger>;

export const DeltakerIkkeSøkt: Story = {
    args: { deltakelse: { ...parsedMockDeltakelse, harSøkt: false }, deltaker: parsedMockDeltaker },
};
export const DeltakerHarSøktUtenSluttdao: Story = {
    name: 'Deltaker har søkt - sluttdato ikke satt',
    args: { deltakelse: { ...parsedMockDeltakelse, tilOgMed: undefined }, deltaker: parsedMockDeltaker },
};
export const DeltakerHarSøktMedSluttdato: Story = {
    name: 'Deltaker har søkt - sluttdato satt',
    args: {
        deltakelse: {
            ...parsedMockDeltakelse,
            tilOgMed: dayjs(parsedMockDeltakelse.fraOgMed).add(6, 'months').toDate(),
        },
        deltaker: parsedMockDeltaker,
    },
};
