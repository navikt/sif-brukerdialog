import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import annetBarnMessages from '@navikt/sif-common-forms-ds/src/forms/annet-barn/annetBarnMessages';
import { soknadIntlMessages } from '@navikt/sif-common-soknad-ds';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { omOmsorgenForBarnMessages } from '../søknad/steps/om-omsorgen-for-barn/omOmsorgenForBarnMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { tidspunktForAleneomsorgMessages } from '../søknad/steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages } from './appMessages';

const bokmålstekster = {
    ...commonMessages.nb,
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
