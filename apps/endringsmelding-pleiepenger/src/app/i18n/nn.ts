import { infoNormalarbeidstidMessages_nn } from '../components/info-normalarbeidstid/i18n/nn';
import { arbeidstidUkerMessages_nn } from '../modules/arbeidstid-uker/i18n/nn';
import { endreArbeidstidFormMessages_nn } from '../modules/endre-arbeidstid-form/i18n/nn';
import { tilsynsordningMånedMessages_nn } from '../modules/tilsynsordning-måned/i18n/nn';
import { velgSakPageMessages_nn } from '../pages/velg-sak/i18n/nn';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { arbeidstidStepMessages_nn } from '../søknad/steps/arbeidstid/i18n/nn';
import { oppsummeringStepMessages_nn } from '../søknad/steps/oppsummering/i18n/nn';
import { tilsynsordningMessages_nn } from '../søknad/steps/tilsynsordning/i18n/nn';
import { ukjentArbeidsforholdStepMessages_nn } from '../søknad/steps/ukjent-arbeidsforhold/i18n/nn';
import { appMessages_nb } from './nb';
import { samtykkeFormOverrideMessages_nn } from './samtykkeFormOverrideMessages';
import { sifCommonSoknadOverrideMessages_nn } from './sifCommonSoknadOverrideMessages';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...appMessages_nb,
    ...arbeidstidStepMessages_nn,
    ...endreArbeidstidFormMessages_nn,
    ...infoNormalarbeidstidMessages_nn,
    ...samtykkeFormOverrideMessages_nn,
    ...ukjentArbeidsforholdStepMessages_nn,
    ...velkommenPageMessages_nn,
    ...velgSakPageMessages_nn,
    ...oppsummeringStepMessages_nn,
    ...sifCommonSoknadOverrideMessages_nn,
    ...arbeidstidUkerMessages_nn,
    ...tilsynsordningMessages_nn,
    ...tilsynsordningMånedMessages_nn,
};
