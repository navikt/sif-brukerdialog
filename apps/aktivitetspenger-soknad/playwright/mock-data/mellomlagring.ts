import { MellomlagringBlob } from '@sif/soknad-app';

export const mellomlagringTilMedlemskap: MellomlagringBlob = {
    versjon: 1,
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
};
