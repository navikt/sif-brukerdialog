import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { ISODateToDate } from '@navikt/sif-common-utils';

import { withDarkBg } from '../../../storybook/decorators/withDarkBg';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import { withQueryClientProvider } from '../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import DeltakerKort from './DeltakerKort';
import { Deltaker } from '@navikt/ung-common';
import { VStack } from '@navikt/ds-react';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

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
        <VStack gap="4">
            <DeltakerKort deltaker={deltaker} />
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [VeilederApi.Diskresjonskode.KODE6] }} />
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [VeilederApi.Diskresjonskode.KODE7] }} />
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [VeilederApi.Diskresjonskode.SKJERMET] }} />
            <DeltakerKort
                deltaker={{
                    ...deltaker,
                    diskresjonskoder: [VeilederApi.Diskresjonskode.KODE6, VeilederApi.Diskresjonskode.SKJERMET],
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
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [VeilederApi.Diskresjonskode.KODE6] }} />
        </BrowserRouter>
    ),
};
export const Kode7: Story = {
    render: () => (
        <BrowserRouter>
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [VeilederApi.Diskresjonskode.KODE7] }} />
        </BrowserRouter>
    ),
};
export const Skjermet: Story = {
    render: () => (
        <BrowserRouter>
            <DeltakerKort deltaker={{ ...deltaker, diskresjonskoder: [VeilederApi.Diskresjonskode.SKJERMET] }} />
        </BrowserRouter>
    ),
};
