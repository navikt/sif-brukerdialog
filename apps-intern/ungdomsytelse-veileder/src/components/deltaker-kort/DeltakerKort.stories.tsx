import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '@navikt/ds-react';
import { BrowserRouter } from 'react-router-dom';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Diskresjonskode } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { withDarkBg } from '../../../storybook/decorators/withDarkBg';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { Deltaker } from '../../types/Deltaker';
import DeltakerKort from './DeltakerKort';

const meta: Meta<typeof DeltakerKort> = {
    component: DeltakerKort,
    title: 'Components/Deltakerkort',
    parameters: {},
    decorators: [withPageWidth, withDarkBg, withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof DeltakerKort>;

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
    sisteMuligeInnmeldingsdato: ISODateToDate('2023-12-31'),
    diskresjonskoder: [],
};

export const Varianter: Story = {
    name: 'Alle varianter',
    render: () => (
        <VStack gap="space-16">
            <DeltakerKort deltaker={deltaker} />
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [Diskresjonskode.KODE6] }} />
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [Diskresjonskode.KODE7] }} />
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [Diskresjonskode.SKJERMET] }} />
            <DeltakerKort
                deltaker={{
                    ...deltaker,
                    diskresjonskoder: [Diskresjonskode.KODE6, Diskresjonskode.SKJERMET],
                }}
            />
        </VStack>
    ),
};

export const UregistrertDeltaker: Story = {
    render: () => (
        <BrowserRouter>
            <DeltakerKort deltaker={deltaker} />
        </BrowserRouter>
    ),
};

export const Kode6: Story = {
    render: () => (
        <BrowserRouter>
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [Diskresjonskode.KODE6] }} />
        </BrowserRouter>
    ),
};
export const Kode7: Story = {
    render: () => (
        <BrowserRouter>
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [Diskresjonskode.KODE7] }} />
        </BrowserRouter>
    ),
};
export const Skjermet: Story = {
    render: () => (
        <BrowserRouter>
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [Diskresjonskode.SKJERMET] }} />
        </BrowserRouter>
    ),
};
