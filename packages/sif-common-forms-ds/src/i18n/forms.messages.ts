import { annetBarnMessages } from '../forms/annet-barn/annetBarnMessages';
import { bostedUtlandMessages } from '../forms/bosted-utland/bostedUtlandMessages';
import { enkeltdatoMessages } from '../forms/enkeltdatoer';
import { ferieuttakMessages } from '../forms/ferieuttak/ferieuttakMessages';
import { fosterbarnMessages } from '../forms/fosterbarn/fosterbarnMessages';
import { fraværMessages } from '../forms/fravær/fraværMessages';
import { medlemskapFormMessages } from '../forms/medlemskap/i18n/medlemskapMessages';
import { opptjeningUtlandMessages } from '../forms/opptjening-utland/opptjeningUtlandMessages';
import { tidsperiodeMessages } from '../forms/tidsperiode/tidsperiodeMessages';
import { utenlandskNæringMessages } from '../forms/utenlandsk-næring/utenlandskNæringMessages';
import { utenlandsoppholdMessages } from '../forms/utenlandsopphold/utenlandsoppholdMessages';
import { virksomhetMessages } from '../forms/virksomhet/i18n';

const nb = {
    ...annetBarnMessages.nb,
    ...bostedUtlandMessages.nb,
    ...ferieuttakMessages.nb,
    ...fosterbarnMessages.nb,
    ...fraværMessages.nb,
    ...opptjeningUtlandMessages.nb,
    ...tidsperiodeMessages.nb,
    ...utenlandskNæringMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...virksomhetMessages.nb,
    ...medlemskapFormMessages.nb,
    ...enkeltdatoMessages.nb,
};

type FormsMessageKeys = keyof typeof nb;

const nn: Record<FormsMessageKeys, string> = {
    ...annetBarnMessages.nn,
    ...bostedUtlandMessages.nn,
    ...ferieuttakMessages.nn,
    ...fosterbarnMessages.nn,
    ...fraværMessages.nn,
    ...opptjeningUtlandMessages.nn,
    ...tidsperiodeMessages.nn,
    ...utenlandskNæringMessages.nn,
    ...utenlandsoppholdMessages.nn,
    ...virksomhetMessages.nn,
    ...medlemskapFormMessages.nn,
    ...enkeltdatoMessages.nn,
};

export const formsMessages = {
    nb,
    nn,
};
