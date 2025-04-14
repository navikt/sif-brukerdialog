import type { Meta, StoryObj } from '@storybook/react';
import { parsedMockDeltakelse, parsedMockDeltaker } from '../../../mock/msw/mocks/mockUtils';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import EndreStartdatoForm from './EndreStartdatoForm';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';

const meta: Meta<typeof EndreStartdatoForm> = {
    component: EndreStartdatoForm,
    title: 'Forms/Endre startdato',
    parameters: {},
    decorators: [withIntl, withVeilederContext, (Story) => withModalWrapper(Story, { header: 'Endre startdato' })],
};
export default meta;

type Story = StoryObj<typeof EndreStartdatoForm>;

export const Default: Story = {
    args: { deltakelse: parsedMockDeltakelse, deltaker: parsedMockDeltaker },
};
