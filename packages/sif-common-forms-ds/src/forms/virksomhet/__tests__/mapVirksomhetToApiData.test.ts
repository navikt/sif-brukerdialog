import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { dateToISODate, jsonSort } from '@navikt/sif-common-utils';
import { mapVirksomhetToVirksomhetApiData } from '../mapVirksomhetToApiData';
import { Næringstype, Virksomhet, VirksomhetApiData } from '../types';
import { erVirksomhetRegnetSomNyoppstartet } from '../virksomhetUtils';
import dayjs from 'dayjs';

const fom = new Date();
const tom = new Date();

const virksomhetFormData: Virksomhet = {
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'ABC',
    fom,
    erPågående: true,
    tom,
    registrertINorge: YesOrNo.YES,
    registrertILand: '',
    organisasjonsnummer: '123123123',
    næringsinntekt: 123,
    harRegnskapsfører: YesOrNo.YES,
    regnskapsfører_navn: 'RegnskapsførerHenrik',
    regnskapsfører_telefon: '234',
};

const virksomhetApiData: VirksomhetApiData = {
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'ABC',
    fraOgMed: dateToISODate(fom),
    tilOgMed: null,
    næringsinntekt: 123,
    registrertINorge: true,
    regnskapsfører: {
        navn: 'RegnskapsførerHenrik',
        telefon: '234',
    },
    organisasjonsnummer: '123123123',
    erNyoppstartet: true,
    harFlereAktiveVirksomheter: false,
};

describe('erVirksomhetRegnetSomNyoppstartet', () => {
    it('True when less than four years ago', () => {
        const validDate = dayjs().subtract(4, 'years').add(1, 'day').toDate();
        expect(erVirksomhetRegnetSomNyoppstartet(validDate)).toBeTruthy();
    });
    it('False when more than four yearsago', () => {
        const invalidDate = dayjs().subtract(4, 'years').toDate();
        expect(erVirksomhetRegnetSomNyoppstartet(invalidDate)).toBeFalsy();
    });
});

describe('mapVirksomhetToApiData', () => {
    it('should verify standard required fields to be mapped', () => {
        const mappedData = mapVirksomhetToVirksomhetApiData('nb', virksomhetFormData as Virksomhet);
        expect(JSON.stringify(jsonSort(mappedData))).toEqual(JSON.stringify(jsonSort(virksomhetApiData)));
    });

    it('should not include orgnumber if it is not registered in Norway', () => {
        const mappedData = mapVirksomhetToVirksomhetApiData('nb', {
            ...virksomhetFormData,
            organisasjonsnummer: '123',
            registrertINorge: YesOrNo.NO,
            registrertILand: 'SWE',
        });
        const apiData: VirksomhetApiData = {
            ...virksomhetApiData,
            organisasjonsnummer: undefined,
            registrertIUtlandet: {
                landkode: 'SWE',
                landnavn: 'Sverige',
            },
            registrertINorge: false,
        };
        expect(JSON.stringify(jsonSort(mappedData))).toEqual(JSON.stringify(jsonSort(apiData)));
    });
});
