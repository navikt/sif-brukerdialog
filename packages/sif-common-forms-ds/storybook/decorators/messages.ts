import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import {
    annetBarnMessages,
    bostedUtlandMessages,
    ferieuttakMessages,
    fosterbarnMessages,
    fraværMessages,
    opptjeningUtlandMessages,
    tidsperiodeMessages,
} from '../../src';
import utenlandskNæringMessages from '../../src/forms/utenlandsk-næring/utenlandskNæringMessages';
import utenlandsoppholdMessages from '../../src/forms/utenlandsopphold/utenlandsoppholdMessages';
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
