import type { Meta, StoryObj } from '@storybook/react';
import { parsedMockDeltakelse, parsedMockDeltaker } from '../../../mock/msw/mocks/mockUtils';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import EndreSluttdatoForm from './EndreSluttdatoForm';

const meta: Meta<typeof EndreSluttdatoForm> = {
    component: EndreSluttdatoForm,
    title: 'Forms/Endre sluttdato',
    parameters: {},
    decorators: [withIntl, withVeilederContext, (Story) => withModalWrapper(Story, { header: 'Endre sluttdato' })],
};
export default meta;

type Story = StoryObj<typeof EndreSluttdatoForm>;

export const Default: Story = {
    args: { deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};
