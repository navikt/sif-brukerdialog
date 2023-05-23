import {
    ArbeiderIPeriodenSvar,
    ArbeidsforholdAktivt,
    ArbeidstidSøknadsdata,
    TimerEllerProsent,
    ValgteEndringer,
} from '../../../types';
import {
    getDataBruktTilUtledningApiData,
    getUkjentArbeidsforholdApiDataFromSøknadsdata,
    mapArbeidsforholdToArbeidsforholdApiData,
} from '../getDataBruktTilUtledning';

const valgteEndringer: ValgteEndringer = {
    arbeidstid: true,
    lovbestemtFerie: true,
};
const commitSha = 'abc';

jest.mock('@navikt/sif-common-core-ds/lib/utils/envUtils', () => ({
    getCommitShaFromEnv: () => {
        return commitSha;
    },
}));

describe('getDataBruktTilUtledning', () => {
    it('returnerer commitSha', () => {
        const result = getDataBruktTilUtledningApiData(valgteEndringer, undefined, undefined);
        expect(result.soknadDialogCommitSha).toEqual(commitSha);
    });
    it('returnerer riktig valgte endringer når kun ferie er valgt', () => {
        const result = getDataBruktTilUtledningApiData({ lovbestemtFerie: true }, undefined, undefined);
        expect(result.valgteEndringer.lovbestemtFerie).toBeTruthy();
        expect(result.valgteEndringer.arbeidstid).toBeFalsy();
    });
    it('returnerer riktig valgte endringer når kun arbeidstid er valgt', () => {
        const result = getDataBruktTilUtledningApiData({ arbeidstid: true }, undefined, undefined);
        expect(result.valgteEndringer.arbeidstid).toBeTruthy();
        expect(result.valgteEndringer.lovbestemtFerie).toBeFalsy();
    });
    it('returnerer riktig valgte endringer når både ferie og arbeidstid er valgt', () => {
        const result = getDataBruktTilUtledningApiData(
            { arbeidstid: true, lovbestemtFerie: true },
            undefined,
            undefined
        );
        expect(result.valgteEndringer.lovbestemtFerie).toBeTruthy();
        expect(result.valgteEndringer.arbeidstid).toBeTruthy();
    });
});

describe('getUkjentArbeidsforholdApiDataFromSøknadsdata', () => {
    const arbeidstid: ArbeidstidSøknadsdata = {
        arbeidsaktivitet: {
            a_123: {
                endringer: {
                    '2020-01-01/2020-02-01': {
                        type: TimerEllerProsent.PROSENT,
                        prosent: 50,
                    },
                },
            },
        },
    };
    it('returnerer tomt array hvis ukjent arbeidsforhold er undefined', () => {
        expect(getUkjentArbeidsforholdApiDataFromSøknadsdata(undefined, undefined)).toHaveLength(0);
        expect(getUkjentArbeidsforholdApiDataFromSøknadsdata(undefined, arbeidstid)).toHaveLength(0);
    });
});

describe('mapArbeidsforholdToArbeidsforholdApiData', () => {
    it('returnerer riktig hvis en ikke er ansatt i arbeidsforholdet', () => {
        const result = mapArbeidsforholdToArbeidsforholdApiData({ arbeidsgiverKey: '123', erAnsatt: false }, undefined);
        expect(result.erAnsatt).toBeFalsy();
        expect(result.organisasjonsnummer).toEqual('123');
    });

    describe('Hvis en er ansatt i arbeidsforholdet', () => {
        const arbeidsforhold: ArbeidsforholdAktivt = {
            arbeidsgiverKey: '123',
            erAnsatt: true,
            normalarbeidstid: { timerPerUke: { hours: '40', minutes: '5' } },
        };
        it('returnerer riktig når bruker jobber som normalt i perioden', () => {
            const result = mapArbeidsforholdToArbeidsforholdApiData(arbeidsforhold, ArbeiderIPeriodenSvar.somVanlig);
            expect(result.organisasjonsnummer).toEqual('123');
            expect(result.erAnsatt).toBeTruthy();
            if (result.erAnsatt) {
                expect(result.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.somVanlig);
                expect(result.normalarbeidstid.timerPerUke).toEqual('PT40H5M');
            }
        });
        it('returnerer riktig når en ikke jobber i perioden', () => {
            const result = mapArbeidsforholdToArbeidsforholdApiData(arbeidsforhold, ArbeiderIPeriodenSvar.heltFravær);
            expect(result.organisasjonsnummer).toEqual('123');
            expect(result.erAnsatt).toBeTruthy();
            if (result.erAnsatt) {
                expect(result.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.heltFravær);
                expect(result.normalarbeidstid.timerPerUke).toEqual('PT40H5M');
            }
        });
        it('returnerer riktig når en kombinerer jobb og pleiepenger i perioden', () => {
            const result = mapArbeidsforholdToArbeidsforholdApiData(arbeidsforhold, ArbeiderIPeriodenSvar.redusert);
            expect(result.organisasjonsnummer).toEqual('123');
            expect(result.erAnsatt).toBeTruthy();
            if (result.erAnsatt) {
                expect(result.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
                expect(result.normalarbeidstid.timerPerUke).toEqual('PT40H5M');
            }
        });
    });
});
