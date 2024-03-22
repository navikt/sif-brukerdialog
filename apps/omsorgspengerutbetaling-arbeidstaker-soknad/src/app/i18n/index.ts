import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { uiMessages } from '@navikt/sif-common-ui';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import fraværMessages from '@navikt/sif-common-forms-ds/src/forms/fravær/fraværMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { fraværStepMessages } from '../søknad/steps/fravær/fraværStepMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { medlemskapMessages } from '../søknad/steps/medlemskap/medlemskapMessages';
import { appMessages } from './appMessages';

import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { situasjonMessages } from '../søknad/steps/situasjon/situasjonStepMessages';
import { bostedUtlandMessages } from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/bostedUtlandMessages';
import { fosterbarnFormMessages } from '../søknad/steps/fosterbarn/fosterbarnFormMessages';
import { fosterbarnMessages } from '@navikt/sif-common-forms-ds/src/forms/fosterbarn/fosterbarnMessages';

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...soknadMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...fosterbarnFormMessages.nb,
    ...fosterbarnMessages.nb,
    ...situasjonMessages.nb,
    ...fraværStepMessages.nb,
    ...bostedUtlandMessages.nb,
    ...fraværMessages.nb,
    ...legeerklæringMessages.nb,
    ...medlemskapMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...appMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};
