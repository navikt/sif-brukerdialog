import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { annetBarnMessages, bostedUtlandMessages, virksomhetMessages } from '@navikt/sif-common-forms-ds';
import { fraværMessages } from '@navikt/sif-common-forms-ds/src/forms/fravær/fraværMessages';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { uiMessages } from '@navikt/sif-common-ui';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidssituasjonMessages } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonMessages';
import { dineBarnMessages } from '../søknad/steps/dine-barn/dineBarnMessages';
import { fraværFraMessages } from '../søknad/steps/fravær-fra/fraværFraMessages';
import { fraværStepMessages } from '../søknad/steps/fravær/fraværStepMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { medlemskapMessages } from '../søknad/steps/medlemskap/medlemskapMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages } from './appMessages';

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...dineBarnMessages.nb,
    ...annetBarnMessages.nb,
    ...bostedUtlandMessages.nb,
    ...fraværStepMessages.nb,
    ...fraværMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...virksomhetMessages.nb,
    ...fraværFraMessages.nb,
    ...legeerklæringMessages.nb,
    ...medlemskapMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...appMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
