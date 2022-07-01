import { MessageFileFormat } from '@navikt/sif-common-core/lib/dev-utils/intl/devIntlUtils';
import { allCommonMessages } from '@navikt/sif-common-core/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad/lib/soknad-intl-messages/soknadIntlMessages';
import barnMessages from '../pre-common/forms/barn/barnMessages';

const appMessagesNB = require('./nb.json');
const introFormMessagesNB = require('../pages/intro-page/introFormMessagesNB.json');
const dinePlikterNB = require('../soknad/velkommen-page/dine-plikter/dinePlikterNB.json');
const personopplysningerNB = require('../soknad/velkommen-page/personopplysninger/personopplysningerNB.json');

const appMessagesNN = require('./nn.json');
const introFormMessagesNN = require('../pages/intro-page/introFormMessagesNN.json');
const dinePlikterNN = require('../soknad/velkommen-page/dine-plikter/dinePlikterNN.json');
const personopplysningerNN = require('../soknad/velkommen-page/personopplysninger/personopplysningerNN.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...appMessagesNB,
    ...introFormMessagesNB,
    ...dinePlikterNB,
    ...personopplysningerNB,
    ...barnMessages.nb,
    ...soknadIntlMessages.nb,
};

export const nynorsktekster = {
    ...allCommonMessages.nn,
    ...appMessagesNN,
    ...introFormMessagesNN,
    ...dinePlikterNN,
    ...personopplysningerNN,
    ...barnMessages.nn,
    ...soknadIntlMessages.nn,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
    // nn: nynorsktekster,
};
