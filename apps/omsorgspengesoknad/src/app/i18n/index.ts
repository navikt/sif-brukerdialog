import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/src/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/src/i18n/soknadIntlMessages';
import { omBarnetMessages } from '../søknad/steps/om-barnet/stegOmBarnetMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { appMessages } from './appMessages';
import { deltBostedMessages } from '../søknad/steps/delt-bosted/deltBostedMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...omBarnetMessages.nb,
    ...deltBostedMessages.nb,
    ...legeerklæringMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...appMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
