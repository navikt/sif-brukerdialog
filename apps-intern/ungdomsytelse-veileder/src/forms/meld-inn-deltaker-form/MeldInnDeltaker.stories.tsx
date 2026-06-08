import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import MeldInnDeltakerForm from './MeldInnDeltakerForm';
import { Deltaker } from '../../types/Deltaker';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withDrawerContext } from '../../../storybook/decorators/withDrawerContext';

const meta: Meta<typeof MeldInnDeltakerForm> = {
    component: MeldInnDeltakerForm,
    title: 'Components/MeldInnDeltakerForm',
    parameters: {},
    decorators: [withIntl, withVeilederContext, withQueryClientProvider, withDrawerContext],
};
export default meta;

const deltaker: Deltaker = {
    id: '123',
    deltakerIdent: '56857102105',
    fødselsdato: ISODateToDate('2000-01-01'),
    registrert: false,
    navn: {
        fornavn: 'Ola',
        mellomnavn: 'Nordmann',
        etternavn: 'Nordmann',
    },
    førsteMuligeInnmeldingsdato: ISODateToDate('2023-01-01'),
    sisteMuligeInnmeldingsdato: ISODateToDate('2030-12-31'),
    diskresjonskoder: [],
};
type Story = StoryObj<typeof MeldInnDeltakerForm>;

export const MeldInnDeltakerFormStory: Story = {
    name: 'MeldInnDeltakerForm',
    args: { deltaker },
};
