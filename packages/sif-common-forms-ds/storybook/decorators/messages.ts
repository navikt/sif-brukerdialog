import bostedUtlandMessages from '../../src/bosted-utland/bostedUtlandMessages';
import ferieuttakMessages from '../../src/ferieuttak/ferieuttakMessages';
import fraværMessages from '../../src/fravær/fraværMessages';
import utenlandsoppholdMessages from '../../src/utenlandsopphold/utenlandsoppholdMessages';
import fosterbarnMessages from '../../src/fosterbarn/fosterbarnMessages';
import virksomhetMessages from '../../src/virksomhet/virksomhetMessages';
import tidsperiodeMessages from '../../src/tidsperiode/tidsperiodeMessages';
import annetBarnMessages from '../../src/annet-barn/annetBarnMessages';

const commonNb = require('@navikt/sif-common-core/lib/i18n/common.nb.json');
const commonNn = require('@navikt/sif-common-core/lib/i18n/common.nn.json');
const validationNb = require('@navikt/sif-common-core/lib/i18n/validationErrors.nb.json');
const validationNn = require('@navikt/sif-common-core/lib/i18n/validationErrors.nn.json');

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
