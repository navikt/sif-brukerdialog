import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import EndreStartdatoForm from './EndreStartdatoForm';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { registrertDeltakerMock } from '../../../mock/data/registrertDeltakerMock';
import { deltakelseSchema } from '../../types/Deltakelse';
import { registrertDeltakerSchema } from '../../types/Deltaker';

const meta: Meta<typeof EndreStartdatoForm> = {
    component: EndreStartdatoForm,
    title: 'Skjema/Endre startdato',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof EndreStartdatoForm>;

const deltakelse = deltakelseSchema.parse(registrertDeltakerMock.deltakelse);
const deltaker = registrertDeltakerSchema.parse(registrertDeltakerMock.deltakerPersonalia);

export const EndreStartdato: Story = {
    name: 'Endre startdato',
    decorators: [(Story) => withModalWrapper(Story, { header: 'Endre startdato' })],
    args: { deltakelse, deltaker },
};
