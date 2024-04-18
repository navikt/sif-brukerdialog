import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import {
    annetBarnMessages,
    bostedUtlandMessages,
    ferieuttakMessages,
    fosterbarnMessages,
    opptjeningUtlandMessages,
    utenlandsoppholdMessages,
} from '../../src';
import { fraværMessages } from '../../src/forms/fravær/fraværMessages';
import tidsperiodeMessages from '../../src/forms/tidsperiode/tidsperiodeMessages';
import utenlandskNæringMessages from '../../src/forms/utenlandsk-næring/utenlandskNæringMessages';
import virksomhetMessages from '../../src/forms/virksomhet/virksomhetMessages';

const bokmålstekster = {
    ...commonMessages.nb,
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
