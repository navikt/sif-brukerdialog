import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/i18n/soknadIntlMessages';
import ferieuttakMessages from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/ferieuttakMessages';
import { endreArbeidstidMessages } from '../modules/endre-arbeidstid-form/endreArbeidstidMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidstidStepMessages } from '../søknad/steps/arbeidstid/arbeidstidStepMessages';
import { oppsummeringStepMessages } from '../søknad/steps/oppsummering/oppsummeringStepMessages';
import { defaultMessages } from './messages';
import { samtykkeFormOverrideMessages } from './samtykkeFormOverrideMessages';
import { sifCommonSoknadOverrideMessages } from './sifCommonSoknadOverrideMessages';
import { infoNormalarbeidstid } from '../søknad/steps/arbeidssituasjon/components/infoNormaltimer.messages';
import { arbeidsforholdFormMessages } from '../søknad/steps/arbeidssituasjon/arbeidsforholdFormMessages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...endreArbeidstidMessages.nb,
    ...arbeidstidStepMessages.nb,
    ...velkommenPageMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...samtykkeFormOverrideMessages.nb,
    ...oppsummeringStepMessages.nb,
    ...sifCommonSoknadOverrideMessages.nb,
    ...ferieuttakMessages.nb,
    ...infoNormalarbeidstid.nb,
    ...arbeidsforholdFormMessages.nb,
    ...defaultMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
