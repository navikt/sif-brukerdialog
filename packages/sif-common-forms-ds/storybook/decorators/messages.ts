import bostedUtlandMessages from '../../src/forms/bosted-utland/bostedUtlandMessages';
import ferieuttakMessages from '../../src/forms/ferieuttak/ferieuttakMessages';
import fraværMessages from '../../src/forms/fravær/fraværMessages';
import utenlandsoppholdMessages from '../../src/forms/utenlandsopphold/utenlandsoppholdMessages';
import fosterbarnMessages from '../../src/forms/fosterbarn/fosterbarnMessages';
import virksomhetMessages from '../../src/forms/virksomhet/virksomhetMessages';
import tidsperiodeMessages from '../../src/forms/tidsperiode/tidsperiodeMessages';
import annetBarnMessages from '../../src/forms/annet-barn/annetBarnMessages';
import utenlandskNæringMessages from '../../src/forms/utenlandsk-næring/utenlandskNæringMessages';
import opptjeningUtlandMessages from '../../src/forms/opptjening-utland/opptjeningUtlandMessages';

import { commonMessagesNb } from '@navikt/sif-common-core-ds/lib/i18n/common.nb';
import { validationErrorsNb } from '@navikt/sif-common-core-ds/lib/i18n/validationErrors.nb';
const bokmålstekster = {
    ...commonMessagesNb,
    ...validationErrorsNb,
    ...bostedUtlandMessages.nb,
    ...fraværMessages.nb,
    ...ferieuttakMessages.nb,
    ...fosterbarnMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...tidsperiodeMessages.nb,
    ...virksomhetMessages.nb,
    ...annetBarnMessages.nb,
    ...utenlandskNæringMessages.nb,
    ...opptjeningUtlandMessages.nb,
};

export const appMessages = {
    nb: bokmålstekster,
};
