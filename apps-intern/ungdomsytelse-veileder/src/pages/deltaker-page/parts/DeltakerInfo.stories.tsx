import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '@navikt/ds-react';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { Diskresjonskode } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { withDarkBg } from '../../../../storybook/decorators/withDarkBg';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../../storybook/decorators/withPageWidth';
import { withQueryClientProvider } from '../../../../storybook/decorators/withQueryClientProvider';
import { withVeilederContext } from '../../../../storybook/decorators/withVeilederContext';
import { Deltaker } from '../../../types/Deltaker';
import DeltakerInfo from './DeltakerInfo';

const meta: Meta<typeof DeltakerInfo> = {
    component: DeltakerInfo,
    title: 'Components/DeltakerInfo',
    parameters: {},
    decorators: [withPageWidth, withDarkBg, withIntl, withVeilederContext, withQueryClientProvider],
};
export default meta;

type Story = StoryObj<typeof DeltakerInfo>;

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
export const Default: Story = {
    name: 'DeltakerInfo',
    render: () => (
        <VStack gap="space-16">
            <DeltakerInfo deltaker={deltaker} />
        </VStack>
    ),
};

export const MedDiskresjonskode: Story = {
    name: 'DeltakerInfo - med diskresjonskode',
    render: () => (
        <VStack gap="space-16">
            <DeltakerInfo deltaker={{ ...deltaker, diskresjonskoder: [Diskresjonskode.KODE6] }} />
        </VStack>
    ),
};
