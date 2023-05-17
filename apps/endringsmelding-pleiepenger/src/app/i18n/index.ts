import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import ferieuttakMessages from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/ferieuttakMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/i18n/soknadIntlMessages';
import { endreArbeidstidMessages } from '../modules/endre-arbeidstid-form/endreArbeidstidMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidstidStepMessages } from '../søknad/steps/arbeidstid/arbeidstidStepMessages';
import { oppsummeringStepMessages } from '../søknad/steps/oppsummering/oppsummeringStepMessages';
import { ukjentArbeidsgiverFormMessages } from '../søknad/steps/ukjent-arbeidsforhold/ukjent-arbeidsgiver-form-part/ukjentArbeidsgiverFormMessages';
import { defaultMessages } from './messages';
import { samtykkeFormOverrideMessages } from './samtykkeFormOverrideMessages';
import { sifCommonSoknadOverrideMessages } from './sifCommonSoknadOverrideMessages';
import { infoNormalarbeidstid } from '../søknad/steps/ukjent-arbeidsforhold/info-normalarbeidstid/infoNormaltimer.messages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...arbeidstidStepMessages.nb,
    ...endreArbeidstidMessages.nb,
    ...ferieuttakMessages.nb,
    ...infoNormalarbeidstid.nb,
    ...oppsummeringStepMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...samtykkeFormOverrideMessages.nb,
    ...sifCommonSoknadOverrideMessages.nb,
    ...soknadIntlMessages.nb,
    ...ukjentArbeidsgiverFormMessages.nb,
    ...velkommenPageMessages.nb,
    ...defaultMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
