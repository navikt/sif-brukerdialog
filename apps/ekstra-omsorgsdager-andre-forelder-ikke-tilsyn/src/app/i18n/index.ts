import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { omAnnenForelderMessages } from '../søknad/steps/om-annen-forelder/omAnnenForelderMessages';
import { annenForelderenSituasjonMessages } from '../søknad/steps/annen-forelderens-situasjon/annenForelderenSituasjonMessages';
import { omBarnaMessages } from '../søknad/steps/om-barna/omBarnaMessages';
import barnMessages from '../pre-common/forms/barn/barnMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages } from './appMessages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...omAnnenForelderMessages.nb,
    ...annenForelderenSituasjonMessages.nb,
    ...omBarnaMessages.nb,
    ...barnMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...appMessages.nb,
};
export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
