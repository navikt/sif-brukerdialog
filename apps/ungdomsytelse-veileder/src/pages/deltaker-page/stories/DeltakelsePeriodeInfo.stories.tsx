import type { Meta, StoryObj } from '@storybook/react-vite';
import DeltakelsePeriodeInfo from '../parts/DeltakelsePeriodeInfo';
import { deltakelseSchema } from '@navikt/ung-common';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { registrertDeltakerMock } from '../../../../mock/msw/mocks/data/registrertDeltakerMock';

const meta: Meta<typeof DeltakelsePeriodeInfo> = {
    component: DeltakelsePeriodeInfo,
    title: 'Deltakelse/Periodeinformasjon',
    parameters: {},
    decorators: [withPageWidth, withIntl],
};
export default meta;

type Story = StoryObj<typeof DeltakelsePeriodeInfo>;

export const Default: Story = {
    args: { deltakelse: deltakelseSchema.parse(registrertDeltakerMock.deltakelse) },
};
