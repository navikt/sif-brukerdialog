import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { uiMessages } from '@navikt/sif-common-ui';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import barnMessages from '../pre-common/forms/barn/barnMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { annenForelderenSituasjonMessages } from '../søknad/steps/annen-forelderens-situasjon/annenForelderenSituasjonMessages';
import { omAnnenForelderMessages } from '../søknad/steps/om-annen-forelder/omAnnenForelderMessages';
import { omBarnaMessages } from '../søknad/steps/om-barna/omBarnaMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages } from './appMessages';

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
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
