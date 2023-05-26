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

const commonNb = require('@navikt/sif-common-core-ds/lib/i18n/common.nb.json');
const commonNn = require('@navikt/sif-common-core-ds/lib/i18n/common.nn.json');
const validationNb = require('@navikt/sif-common-core-ds/lib/i18n/validationErrors.nb.json');
const validationNn = require('@navikt/sif-common-core-ds/lib/i18n/validationErrors.nn.json');

const bokmålstekster = {
    ...commonNb,
    ...validationNb,
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
    'common.fieldvalidation.ugyldigTall': 'Ugyldig tall',
};

const nynorsktekster = {
    ...commonNn,
    ...validationNn,
    ...bostedUtlandMessages.nn,
    ...fraværMessages.nn,
    ...ferieuttakMessages.nn,
    ...fosterbarnMessages.nn,
    ...utenlandsoppholdMessages.nn,
    ...tidsperiodeMessages.nn,
    ...virksomhetMessages.nn,
    ...annetBarnMessages.nn,
    'common.fieldvalidation.ugyldigTall': 'Ugyldig tall',
};

export const appMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
};
