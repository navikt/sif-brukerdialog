import type { MellomlagringBlob } from '@sif/soknad-app';
// Egen subpath: @sif/utils-index drar med JSON-importer som ikke kjører i Playwright/Node
import { createGrunnlagHash } from '@sif/utils/grunnlagHash';

/** Må tilsvare mellomlagringGrunnlag i Soknad.tsx for standardProfilMedKontonummer (ett barn, kontonummer registrert). */
const grunnlagStandardProfilMedKontonummer = { antallBarn: 1, harKontonummer: 'JA' };

export const getMellomlagringTilMedlemskap = async (): Promise<MellomlagringBlob> => ({
    versjon: 1.1,
    resumeStepId: 'medlemskap',
    søknadsdata: {
        harForståttRettigheterOgPlikter: true,
        kontonummer: {
            kontonummerErRiktig: true,
        },
        bosted: {
            erBosattITrondheim: true,
        },
    },
    grunnlagHash: await createGrunnlagHash(grunnlagStandardProfilMedKontonummer),
});
