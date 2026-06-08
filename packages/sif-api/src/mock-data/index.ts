// Entiteter (atomære enkeltobjekter med identitet)
export { alfaTestesen, betaTestesen } from './entiteter/barn';
export { arbeidsgivansenAS, norskBedriftAS, vingeFlyfly } from './entiteter/organisasjoner';
export { noraKronjuvel, testBrukeresen, testTestesen } from './entiteter/søkere';

// Api-responser (sammensatt av entiteter, for MSW/Playwright)
export {
    arbeidsgivereEnOrgResponse,
    arbeidsgivereTomResponse,
    arbeidsgivereToOrgResponse,
} from './api-response/arbeidsgivere';
export { barnListeEttBarn, barnListeToBarn, barnListeTom } from './api-response/barn';
export { kontonummerApiResponse } from './api-response/kontonummer';
export { søkerNoraKronjuvel, søkerTestBrukeresen, søkerTestTestesen } from './api-response/søker';

// Parsed (Date-objekter for storybook/enhetstester)
export { mockArbeidsgivere } from './parsed/arbeidsgivere';
export { mockRegistrertBarn, mockRegistrerteBarn } from './parsed/barn';
export { mockSøker } from './parsed/søker';

// Profiler (kombinasjoner av responser)
export {
    ingenBarnProfil,
    standardProfil,
    standardProfilMedArbeidsgiver,
    standardProfilMedKontonummer,
} from './profiler';
