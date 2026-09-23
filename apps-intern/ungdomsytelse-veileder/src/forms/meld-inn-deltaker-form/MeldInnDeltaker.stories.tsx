import { ISODateToDate } from '@navikt/sif-common-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withDrawerContext } from '../../../storybook/decorators/withDrawerContext';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { Deltaker } from '../../types/Deltaker';
import MeldInnDeltakerForm from './MeldInnDeltakerForm';

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
