import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/i18n/soknadIntlMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { appMessages } from './appMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { dineBarnMessages } from '../søknad/steps/dine-barn/DineBarnMessages';
import fraværMessages from '@navikt/sif-common-forms-ds/lib/forms/fravær/fraværMessages';
import bostedUtlandMessages from '@navikt/sif-common-forms-ds/lib/forms/bosted-utland/bostedUtlandMessages';
import virksomhetMessages from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/virksomhetMessages';
import { fraværFraMessages } from '../søknad/steps/fravær-fra/fraværFraMessages';
import { medlemskapMessages } from '../søknad/steps/medlemskap/medlemskapMessages';
import { arbeidssituasjonMessages } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonMessages';

export const appBokmålstekster = require('./nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...dineBarnMessages.nb,
    ...bostedUtlandMessages.nb,
    ...fraværMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...virksomhetMessages.nb,
    ...fraværFraMessages.nb,
    ...appBokmålstekster,
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
