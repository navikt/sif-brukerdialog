import dayjs from 'dayjs';
import { testDate } from '../utils/setNow';

const getDateNYearsAgo = (years: number): Date => {
    return dayjs(testDate).subtract(years, 'year').toDate();
};

const søkerMock = {
    aktørId: '2320509955297',
    fødselsdato: '1995-06-02',
    fødselsnummer: '02869599258',
    fornavn: 'PRESENTABEL',
    mellomnavn: null,
    etternavn: 'HOFTE',
};

const barn = {
    toÅr: {
        fornavn: '2 år',
        etternavn: 'FAGGOTT',
        aktørId: '2',
        fødselsdato: getDateNYearsAgo(2),
        fødselsnummer: '2',
    },
    treÅr: {
        fornavn: '3 år',
        etternavn: 'FAGGOTT',
        aktørId: '3',
        fødselsdato: getDateNYearsAgo(3),
        fødselsnummer: '3',
    },
    fireÅr: {
        fornavn: '4 år',
        etternavn: 'FAGGOTT',
        aktørId: '4',
        fødselsdato: getDateNYearsAgo(4),
        fødselsnummer: '4',
    },
    tolvÅr: {
        fornavn: '12 år',
        etternavn: 'FAGGOTT',
        aktørId: '12',
        fødselsdato: getDateNYearsAgo(12),
        fødselsnummer: '12',
    },
    trettenÅr: {
        fornavn: '13 år',
        etternavn: 'FAGGOTT',
        aktørId: '13',
        fødselsdato: getDateNYearsAgo(13),
        fødselsnummer: '13',
    },
};

const barnMock = {
    toBarnUnder13: { barn: [barn.toÅr, barn.treÅr] },
    treBarnUnder13: { barn: [barn.toÅr, barn.treÅr, barn.fireÅr] },
    ettBarnOver13: { barn: [barn.trettenÅr] },
    ettOverOgEttUnder13: { barn: [barn.tolvÅr, barn.trettenÅr] },
    ingenBarn: { barn: [] },
};

export const playwrightApiMockData = {
    barnMock,
    søkerMock,
};
