import annetBarnMessages from '../forms/annet-barn/annetBarnMessages';
import bostedUtlandMessages from '../forms/bosted-utland/bostedUtlandMessages';
import ferieuttakMessages from '../forms/ferieuttak/ferieuttakMessages';
import fosterbarnMessages from '../forms/fosterbarn/fosterbarnMessages';
import fraværMessages from '../forms/fravær/fraværMessages';
import opptjeningUtlandMessages from '../forms/opptjening-utland/opptjeningUtlandMessages';
import tidsperiodeMessages from '../forms/tidsperiode/tidsperiodeMessages';
import utenlandskNæringMessages from '../forms/utenlandsk-næring/utenlandskNæringMessages';
import utenlandsoppholdMessages from '../forms/utenlandsopphold/utenlandsoppholdMessages';
import virksomhetMessages from '../forms/virksomhet/virksomhetMessages';

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
};

type FormsMessageKeys = keyof typeof nb;

const nn: Record<FormsMessageKeys, string> = {
    ...nb,
    ...annetBarnMessages.nn,
};

export const formsMessages = {
    nb,
    nn,
};
