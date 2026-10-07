import type { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';

export type SøkersRelasjonTilBarnet = NonNullable<omsorgspenger.OmsorgspengerKroniskSyktBarnSøknad['relasjonTilBarnet']>;

export const SøkersRelasjonTilBarnet = {
    MOR: 'MOR' as SøkersRelasjonTilBarnet,
    FAR: 'FAR' as SøkersRelasjonTilBarnet,
    ADOPTIVFORELDER: 'ADOPTIVFORELDER' as SøkersRelasjonTilBarnet,
    FOSTERFORELDER: 'FOSTERFORELDER' as SøkersRelasjonTilBarnet,
} as const;
