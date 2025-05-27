import { annetBarnMessages } from '../forms/annet-barn/i18n';
import { bostedUtlandMessages } from '../forms/bosted-utland/i18n';
import { enkeltdatoMessages } from '../forms/enkeltdatoer';
import { ferieuttakMessages } from '../forms/ferieuttak/i18n';
import { fosterbarnMessages } from '../forms/fosterbarn/i18n';
import { fraværMessages } from '../forms/fravær/i18n';
import { medlemskapFormMessages } from '../forms/medlemskap/i18n';
import { opptjeningUtlandMessages } from '../forms/opptjening-utland/i18n';
import { tidsperiodeMessages } from '../forms/tidsperiode/i18n';
import { utenlandskNæringMessages } from '../forms/utenlandsk-næring/i18n';
import { utenlandsoppholdMessages } from '../forms/utenlandsopphold/i18n';
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
