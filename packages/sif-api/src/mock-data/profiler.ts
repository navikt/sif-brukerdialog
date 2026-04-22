import { arbeidsgivereEnOrgResponse } from './api-response/arbeidsgivere';
import { barnListeEttBarn, barnListeTom } from './api-response/barn';
import { kontonummerApiResponse } from './api-response/kontonummer';
import { søkerTestTestesen } from './api-response/søker';

export const standardProfil = {
    søker: søkerTestTestesen,
    barn: barnListeEttBarn,
};

export const ingenBarnProfil = {
    søker: søkerTestTestesen,
    barn: barnListeTom,
};

export const standardProfilMedKontonummer = {
    ...standardProfil,
    kontonummer: kontonummerApiResponse,
};

export const standardProfilMedArbeidsgiver = {
    ...standardProfil,
    arbeidsgivere: arbeidsgivereEnOrgResponse,
};
