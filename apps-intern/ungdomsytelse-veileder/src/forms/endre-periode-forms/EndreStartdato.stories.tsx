import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { deltakelseSchema } from '../../types/Deltakelse';
import { registrertDeltakerSchema } from '../../types/Deltaker';
import EndreStartdatoForm from './EndreStartdatoForm';
import { nyligRegistrertScenario } from '../../../mock/scenarioer/nyligRegistrert';

const meta: Meta<typeof EndreStartdatoForm> = {
    component: EndreStartdatoForm,
    title: 'Skjema/Endre startdato',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof EndreStartdatoForm>;

const deltakelse = deltakelseSchema.parse(nyligRegistrertScenario.deltakelse);
const deltaker = registrertDeltakerSchema.parse(nyligRegistrertScenario.deltakerPersonalia);

export const EndreStartdato: Story = {
    name: 'Endre startdato',
    decorators: [(Story) => withModalWrapper(Story, { header: 'Endre startdato' })],
    args: { deltakelse, deltaker },
};
