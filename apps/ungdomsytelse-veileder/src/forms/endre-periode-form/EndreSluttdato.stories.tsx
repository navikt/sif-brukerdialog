import type { Meta, StoryObj } from '@storybook/react-vite';
import { registrertDeltakerMock } from '../../../mock/data/registrertDeltakerMock';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { deltakelseSchema } from '../../types/Deltakelse';
import { registrertDeltakerSchema } from '../../types/Deltaker';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import EndrePeriodeForm from './EndrePeriodeForm';

const meta: Meta<typeof EndrePeriodeForm> = {
    component: EndrePeriodeForm,
    title: 'Skjema/Endre sluttdato',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof EndrePeriodeForm>;

const deltakelse = deltakelseSchema.parse(registrertDeltakerMock.deltakelse);
const deltaker = registrertDeltakerSchema.parse(registrertDeltakerMock.deltakerPersonalia);

export const EndreSluttdato: Story = {
    name: 'Endre sluttdato',
    decorators: [(Story) => withModalWrapper(Story, { header: 'Endre sluttdato' })],
    args: { variant: EndrePeriodeVariant.sluttdato, deltakelse, deltaker },
};
