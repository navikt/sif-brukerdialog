import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { ferieuttakMessages } from '@navikt/sif-common-forms-ds';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { infoNormalarbeidstid } from '../components/info-normalarbeidstid/infoNormalarbeidstid.messages';
import { endreArbeidstidMessages } from '../modules/endre-arbeidstid-form/endreArbeidstidMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidstidStepMessages } from '../søknad/steps/arbeidstid/arbeidstidStepMessages';
import { oppsummeringStepMessages } from '../søknad/steps/oppsummering/oppsummeringStepMessages';
import { ukjentArbeidsforholdFormMessages } from '../søknad/steps/ukjent-arbeidsforhold/ukjentArbeidsforholdFormMessages';
import { defaultMessages } from './messages';
import { samtykkeFormOverrideMessages } from './samtykkeFormOverrideMessages';
import { sifCommonSoknadOverrideMessages } from './sifCommonSoknadOverrideMessages';

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
    ...arbeidstidStepMessages.nb,
    ...endreArbeidstidMessages.nb,
    ...ferieuttakMessages.nb,
    ...infoNormalarbeidstid.nb,
    ...personalOpplysningerMessages.nb,
    ...samtykkeFormOverrideMessages.nb,
    ...ukjentArbeidsforholdFormMessages.nb,
    ...velkommenPageMessages.nb,
    ...oppsummeringStepMessages.nb,
    ...defaultMessages.nb,
    ...sifCommonSoknadOverrideMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
