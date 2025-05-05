import type { Meta, StoryObj } from '@storybook/react';
import { parsedMockDeltakelse, parsedMockDeltaker } from '../../../mock/msw/mocks/mockUtils';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import EndrePeriodeForm from './EndrePeriodeForm';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';

const meta: Meta<typeof EndrePeriodeForm> = {
    component: EndrePeriodeForm,
    title: 'Forms/Endre periode form',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof EndrePeriodeForm>;

export const EndreStartdato: Story = {
    name: 'Endre startdato',
    decorators: [(Story) => withModalWrapper(Story, { header: 'Endre startdato' })],
    args: { variant: EndrePeriodeVariant.startdato, deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};

export const EndreSluttdato: Story = {
    name: 'Endre sluttdao',
    decorators: [(Story) => withModalWrapper(Story, { header: 'Endre sluttdato' })],
    args: { variant: EndrePeriodeVariant.sluttdato, deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};
