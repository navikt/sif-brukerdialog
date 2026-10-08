import type { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';

export type SøkersRelasjonTilBarnet = NonNullable<
    omsorgspenger.OmsorgspengerKroniskSyktBarnSøknad['relasjonTilBarnet']
>;

export const SøkersRelasjonTilBarnet = {
    MOR: 'MOR',
    FAR: 'FAR',
    ADOPTIVFORELDER: 'ADOPTIVFORELDER',
    FOSTERFORELDER: 'FOSTERFORELDER',
} as const satisfies Record<SøkersRelasjonTilBarnet, SøkersRelasjonTilBarnet>;
