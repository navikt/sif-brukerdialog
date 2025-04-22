import type { Meta, StoryObj } from '@storybook/react';
import { parsedMockDeltakelse, parsedMockDeltaker } from '../../../mock/msw/mocks/mockUtils';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import EndrePeriodeForm from './EndrePeriodeForm';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';

const meta: Meta<typeof EndrePeriodeForm> = {
    component: EndrePeriodeForm,
    title: 'Forms/Endre periode form',
    parameters: {},
    decorators: [withIntl, withVeilederContext, (Story) => withModalWrapper(Story, { header: 'Endre startdato' })],
};
export default meta;

type Story = StoryObj<typeof EndrePeriodeForm>;

export const Default: Story = {
    args: { deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};
