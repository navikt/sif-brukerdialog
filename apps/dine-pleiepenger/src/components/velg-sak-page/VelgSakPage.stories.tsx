import { SakerMetadataDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { flereSakerMock } from '../../../api-mock-server/mockdata/flere-saker.mock';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import VelgSakPage from './VelgSakPage';

// Extract metadata from full saker
const sakerMetadata: SakerMetadataDto[] = flereSakerMock.map(
    (sak) =>
        ({
            saksnummer: sak.sak.saksnummer,
            fagsakYtelseType: 'PLEIEPENGER_SYKT_BARN',
            pleietrengende: {
                identitetsnummer: sak.pleietrengende.identitetsnummer,
                aktørId: sak.pleietrengende.aktørId,
                fødselsdato: sak.pleietrengende.fødselsdato.toISOString().split('T')[0],
                ...(sak.pleietrengende.anonymisert === false && {
                    fornavn: sak.pleietrengende.fornavn,
                    etternavn: sak.pleietrengende.etternavn,
                }),
            },
        }) as unknown as SakerMetadataDto,
);

const meta: Meta<typeof VelgSakPage> = {
    component: VelgSakPage,
    title: 'Content/VelgSakPage',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof VelgSakPage>;

export const Default: Story = {
    name: 'Flere saker',
    args: {
        sakerMetadata: sakerMetadata,
    },
};
