import { OmsorgspengerKroniskSyktBarnSøknad } from '@navikt/k9-brukerdialog-prosessering-api';

export type SøkersRelasjonTilBarnet = NonNullable<OmsorgspengerKroniskSyktBarnSøknad['relasjonTilBarnet']>;

export const SøkersRelasjonTilBarnet = {
    MOR: 'MOR' as SøkersRelasjonTilBarnet,
    FAR: 'FAR' as SøkersRelasjonTilBarnet,
    ADOPTIVFORELDER: 'ADOPTIVFORELDER' as SøkersRelasjonTilBarnet,
    FOSTERFORELDER: 'FOSTERFORELDER' as SøkersRelasjonTilBarnet,
} as const;
