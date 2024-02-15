import { AnnetBarn, BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { RegistrertBarn } from '../app/types/RegistrertBarn';
import dayjs from 'dayjs';

const date2yearsAgo = dayjs().subtract(2, 'y').startOf('year').toDate();
const date3yearsAgo = dayjs().subtract(3, 'y').startOf('year').toDate();
const date4yearsAgo = dayjs().subtract(4, 'y').startOf('year').toDate();
const date12yearsAgo = dayjs().subtract(13, 'y').startOf('year').toDate();
const date13yearsAgo = dayjs().subtract(13, 'y').startOf('year').toDate();
const date14yearsAgo = dayjs().subtract(14, 'y').startOf('year').toDate();
const date15yearsAgo = dayjs().subtract(15, 'y').startOf('year').toDate();

const registrertBarn2years: RegistrertBarn = {
    aktørId: '1',
    fornavn: 'To',
    etternavn: 'Doe',
    fødselsdato: date2yearsAgo,
};
const registrertBarn3years: RegistrertBarn = {
    aktørId: '2',
    fornavn: 'Tre',
    etternavn: 'Doe',
    fødselsdato: date3yearsAgo,
};
const registrertBarn4years: RegistrertBarn = {
    aktørId: '3',
    fornavn: 'Fire',
    etternavn: 'Doe',
    fødselsdato: date4yearsAgo,
};
const registrertBarn13years: RegistrertBarn = {
    aktørId: '4',
    fornavn: 'Tretten',
    etternavn: 'Doe',
    fødselsdato: date13yearsAgo,
};
const registrertBarn12years: RegistrertBarn = {
    aktørId: '4',
    fornavn: 'Tretten',
    etternavn: 'Doe',
    fødselsdato: date12yearsAgo,
};
const registrertBarn14years: RegistrertBarn = {
    aktørId: '5',
    fornavn: 'Fjorten',
    etternavn: 'Doe',
    fødselsdato: date14yearsAgo,
};
const registrertBarn15years: RegistrertBarn = {
    aktørId: '6',
    fornavn: 'Femten',
    etternavn: 'Doe',
    fødselsdato: date15yearsAgo,
};
const annetBarn2years: AnnetBarn = {
    fnr: 'a1',
    navn: 'Annet to',
    type: BarnType.annet,
    fødselsdato: date2yearsAgo,
};
const annetBarn15years: AnnetBarn = {
    fnr: 'a2',
    navn: 'Annet Femten',
    type: BarnType.annet,
    fødselsdato: date15yearsAgo,
};

export const barnMockData = {
    registrertBarn2years,
    registrertBarn3years,
    registrertBarn4years,
    registrertBarn12years,
    registrertBarn13years,
    registrertBarn14years,
    registrertBarn15years,
    annetBarn2years,
    annetBarn15years,
    ettBarnUnder13: [registrertBarn2years],
    toBarnUnder13: [registrertBarn2years, annetBarn2years],
    treBarnUnder13: [annetBarn2years, registrertBarn3years, registrertBarn4years],
    toBarnUnderOgEttBarnOver: [registrertBarn2years, registrertBarn3years, registrertBarn13years],
    treBarnUnderOgEttBarnOver: [
        registrertBarn2years,
        registrertBarn3years,
        registrertBarn4years,
        registrertBarn13years,
    ],
    ettBarnOver13: [registrertBarn13years],
    toBarnOver13: [registrertBarn13years, annetBarn15years],
    treBarnOver13: [registrertBarn13years, registrertBarn14years, registrertBarn15years],
};
