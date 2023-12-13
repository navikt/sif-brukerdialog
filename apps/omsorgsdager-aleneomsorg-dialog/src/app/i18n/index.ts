import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/src/i18n/allCommonMessages';
import { soknadIntlMessages } from '@navikt/sif-common-soknad-ds';
import annetBarnMessages from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/annetBarnMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { appMessages } from './appMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { omOmsorgenForBarnMessages } from '../søknad/steps/om-omsorgen-for-barn/omOmsorgenForBarnMessages';
import { tidspunktForAleneomsorgMessages } from '../søknad/steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgMessages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...omOmsorgenForBarnMessages.nb,
    ...annetBarnMessages.nb,
    ...tidspunktForAleneomsorgMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...appMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
