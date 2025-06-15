import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import EndrePeriodeForm from './EndrePeriodeForm';
import { withModalWrapper } from '../../../storybook/decorators/withModalWrapper';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import { deltakelseSchema, registrertDeltakerSchema } from '@navikt/ung-common';
import { registrertDeltakerMock } from '../../../mock/msw/mocks/data/registrertDeltakerMock';

const meta: Meta<typeof EndrePeriodeForm> = {
    component: EndrePeriodeForm,
    title: 'Forms/Endre startdato',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof EndrePeriodeForm>;

const deltakelse = deltakelseSchema.parse(registrertDeltakerMock.deltakelse);
const deltaker = registrertDeltakerSchema.parse(registrertDeltakerMock.deltakerPersonalia);

export const EndreStartdato: Story = {
    name: 'Endre startdato',
    decorators: [(Story) => withModalWrapper(Story, { header: 'Endre startdato' })],
    args: { variant: EndrePeriodeVariant.startdato, deltakelse, deltaker },
};
