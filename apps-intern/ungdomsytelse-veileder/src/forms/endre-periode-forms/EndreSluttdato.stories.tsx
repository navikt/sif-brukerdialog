import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { deltakelseSchema } from '../../types/Deltakelse';
import { registrertDeltakerSchema } from '../../types/Deltaker';
import EndreSluttdatoForm from './EndreSluttdatoForm';
import { nyligRegistrertScenario } from '../../../mock/scenarioer/nyligRegistrert';
import dayjs from 'dayjs';

const meta: Meta<typeof EndreSluttdatoForm> = {
    component: EndreSluttdatoForm,
    title: 'Skjema/Endre sluttdato',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof EndreSluttdatoForm>;

const deltakelse = deltakelseSchema.parse(nyligRegistrertScenario.deltakelse);
deltakelse.tilOgMed = dayjs(deltakelse.fraOgMed).add(9, 'month').toDate();
const deltaker = registrertDeltakerSchema.parse(nyligRegistrertScenario.deltakerPersonalia);

export const EndreSluttdato: Story = {
    name: 'Endre sluttdato',
    decorators: [(Story) => withModalWrapper(Story, { header: 'Endre sluttdato' })],
    args: { deltakelse, deltaker },
};
