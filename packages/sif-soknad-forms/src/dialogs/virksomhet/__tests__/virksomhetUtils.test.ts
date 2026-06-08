import { dateUtils } from '@navikt/sif-common-utils';
import { YesOrNo } from '@sif/rhf';
import { describe, expect, it } from 'vitest';

import { Næringstype, Virksomhet } from '../types';
import {
    erFiskerNæringstype,
    erVirksomhetRegnetSomNyoppstartet,
    formValuesToVirksomhet,
    VirksomhetFormValues,
    virksomhetToFormValues,
} from '../virksomhetUtils';

const nyoppstartetFom = new Date();
const gammelFom = new Date('2015-01-01');

const baseVirksomhet: Virksomhet = {
    id: 'abc',
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'Test AS',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '123456789',
    fom: gammelFom,
    harRegnskapsfører: YesOrNo.NO,
};

const baseFormValues: VirksomhetFormValues = {
    næringstype: Næringstype.ANNEN,
    fiskerErPåBladB: YesOrNo.UNANSWERED,
    navnPåVirksomheten: 'Test AS',
    registrertINorge: YesOrNo.YES,
    registrertILand: '',
    organisasjonsnummer: '123456789',
    fom: dateUtils.dateToISODate(gammelFom),
    tom: '',
    erPågående: false,
    næringsinntekt: '',
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: YesOrNo.UNANSWERED,
    blittYrkesaktivDato: '',
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.UNANSWERED,
    varigEndringINæringsinntekt_dato: '',
    varigEndringINæringsinntekt_inntektEtterEndring: '',
    varigEndringINæringsinntekt_forklaring: '',
    harRegnskapsfører: YesOrNo.NO,
    regnskapsfører_navn: '',
    regnskapsfører_telefon: '',
};

describe('erFiskerNæringstype', () => {
    it('returnerer true for FISKE', () => {
        expect(erFiskerNæringstype(Næringstype.FISKE)).toBe(true);
    });
    it('returnerer false for andre typer og undefined', () => {
        expect(erFiskerNæringstype(Næringstype.ANNEN)).toBe(false);
        expect(erFiskerNæringstype(undefined)).toBe(false);
    });
});

describe('erVirksomhetRegnetSomNyoppstartet', () => {
    it('nylig dato er nyoppstartet', () => {
        expect(erVirksomhetRegnetSomNyoppstartet(nyoppstartetFom)).toBe(true);
    });
    it('gammel dato er ikke nyoppstartet', () => {
        expect(erVirksomhetRegnetSomNyoppstartet(gammelFom)).toBe(false);
    });
});

describe('virksomhetToFormValues', () => {
    it('mapper virksomhet til formverdier', () => {
        const result = virksomhetToFormValues(baseVirksomhet);
        expect(result.navnPåVirksomheten).toBe('Test AS');
        expect(result.fom).toBe(dateUtils.dateToISODate(gammelFom));
        expect(result.tom).toBe('');
        expect(result.registrertINorge).toBe(YesOrNo.YES);
    });
});

describe('formValuesToVirksomhet', () => {
    it('mapper formverdier til virksomhet', () => {
        const result = formValuesToVirksomhet(baseFormValues, 'abc');
        expect(result.navnPåVirksomheten).toBe('Test AS');
        expect(result.næringstype).toBe(Næringstype.ANNEN);
        expect(result.registrertINorge).toBe(YesOrNo.YES);
        expect(result.organisasjonsnummer).toBe('123456789');
        expect(result.harRegnskapsfører).toBe(YesOrNo.NO);
    });

    it('kaster ved manglende fom', () => {
        expect(() => formValuesToVirksomhet({ ...baseFormValues, fom: '' })).toThrow();
    });

    it('nullstiller harRegnskapsfører når registrertINorge er NO', () => {
        const result = formValuesToVirksomhet({
            ...baseFormValues,
            registrertINorge: YesOrNo.NO,
            registrertILand: 'SE',
            harRegnskapsfører: YesOrNo.YES,
        });
        expect(result.harRegnskapsfører).toBe(YesOrNo.UNANSWERED);
        expect(result.regnskapsfører_navn).toBeUndefined();
    });

    it('inkluderer tom når ikke pågående', () => {
        const tomDate = new Date('2020-06-01');
        const result = formValuesToVirksomhet({
            ...baseFormValues,
            erPågående: false,
            tom: dateUtils.dateToISODate(tomDate),
        });
        expect(result.tom).toEqual(tomDate);
    });

    it('utelater tom når pågående', () => {
        const result = formValuesToVirksomhet({
            ...baseFormValues,
            erPågående: true,
            tom: '2020-06-01',
        });
        expect(result.tom).toBeUndefined();
    });

    it('inkluderer fiskerErPåBladB kun for FISKE', () => {
        const fiskeResult = formValuesToVirksomhet({
            ...baseFormValues,
            næringstype: Næringstype.FISKE,
            fiskerErPåBladB: YesOrNo.YES,
        });
        expect(fiskeResult.fiskerErPåBladB).toBe(YesOrNo.YES);

        const annenResult = formValuesToVirksomhet({
            ...baseFormValues,
            næringstype: Næringstype.ANNEN,
            fiskerErPåBladB: YesOrNo.YES,
        });
        expect(annenResult.fiskerErPåBladB).toBeUndefined();
    });
});
