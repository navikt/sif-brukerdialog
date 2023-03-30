import { DateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';
import { K9Sak, K9SakArbeidstaker } from '../../types/K9Sak';
import { tilgangskontroll, tilgangskontrollUtils } from '../tilgangskontroll';

const arbeidsgiver1: Arbeidsgiver = { organisasjonsnummer: '1' } as Arbeidsgiver;
const arbeidsgiver2: Arbeidsgiver = { organisasjonsnummer: '2' } as Arbeidsgiver;
const arbeidsgiver3: Arbeidsgiver = { organisasjonsnummer: '3' } as Arbeidsgiver;

const arbeidstaker1: K9SakArbeidstaker = { organisasjonsnummer: '1' } as K9SakArbeidstaker;
const arbeidstaker2: K9SakArbeidstaker = { organisasjonsnummer: '2' } as K9SakArbeidstaker;

jest.mock('@navikt/sif-common-core-ds/lib/utils/envUtils', () => ({
    getEnvironmentVariable: () => {
        return false;
    },
}));

describe('tilgangskontroll', () => {
    it('stopper ved ingen sak', () => {
        const result = tilgangskontroll([], []);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
    it('stopper hvis bruker har flere enn én sak', () => {
        const result = tilgangskontroll([true, false] as any, []);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
    it('stopper hvis bruker har arbeidsgiver som ikke er i sak', () => {
        const sak: K9Sak = {
            ytelse: {
                arbeidstid: {
                    arbeidstakerList: [
                        {
                            organisasjonsnummer: '2',
                        },
                    ],
                },
                søknadsperioder: [ISODateRangeToDateRange('2022-01-01/2022-10-01')],
            },
        } as K9Sak;
        const result = tilgangskontroll([sak], [arbeidsgiver1]);
        expect(result.kanBrukeSøknad).toBeFalsy();
        if (result.kanBrukeSøknad === false) {
            expect(result.årsak).toEqual(IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet);
        }
    });
    it('stopper hvis det er arbeidsaktivitet i sak som ikke har arbeidsgiver', () => {
        const sak: K9Sak = {
            ytelse: {
                arbeidstid: {
                    arbeidstakerList: [
                        {
                            organisasjonsnummer: '1',
                        },
                        {
                            organisasjonsnummer: '3',
                        },
                    ],
                },
                søknadsperioder: [ISODateRangeToDateRange('2022-01-01/2022-10-01')],
            },
        } as K9Sak;
        const result = tilgangskontroll([sak], [arbeidsgiver1]);
        expect(result.kanBrukeSøknad).toBeFalsy();
        if (result.kanBrukeSøknad === false) {
            expect(result.årsak).toEqual(IngenTilgangÅrsak.harArbeidsaktivitetUtenArbeidsgiver);
        }
    });
});

describe('harArbeidsgiverUtenArbeidstakerK9Sak', () => {
    it('returnerer true dersom arbeidsgiver ikke har arbeidsaktivitet i sak', () => {
        const result = tilgangskontrollUtils.harArbeidsgiverUtenArbeidsaktivitet(
            [arbeidsgiver3],
            [arbeidstaker1, arbeidstaker2]
        );
        expect(result).toBeTruthy();
    });
    it('returnerer false dersom alle arbeidsgivere har arbeidsaktivitet i sak', () => {
        const result = tilgangskontrollUtils.harArbeidsgiverUtenArbeidsaktivitet(
            [arbeidsgiver1, arbeidsgiver2],
            [arbeidstaker1, arbeidstaker2]
        );
        expect(result).toBeFalsy();
    });
});
describe('harArbeidstakerISakUtenArbeidsforhold', () => {
    it('returnerer true dersom har har arbeidsaktivitet i sak med ikke tilhørende arbeidsgiver', () => {
        const result = tilgangskontrollUtils.harArbeidsaktivitetUtenArbeidsgiver(
            [arbeidstaker1, arbeidstaker2],
            [arbeidsgiver3]
        );
        expect(result).toBeTruthy();
    });
    it('returnerer false dersom alle arbeidsaktiviteter i sak har tilhørende arbeidsgiver', () => {
        const result = tilgangskontrollUtils.harArbeidsaktivitetUtenArbeidsgiver(
            [arbeidstaker1, arbeidstaker2],
            [arbeidsgiver1, arbeidsgiver2]
        );
        expect(result).toBeFalsy();
    });
});

describe('harSakSøknadsperiodeInnenforTillattEndringsperiode', () => {
    const tillatEndringsperiode = ISODateRangeToDateRange('2022-01-02/2022-02-01');
    const søknadsperiodeUtenfor: DateRange = ISODateRangeToDateRange('2022-01-01/2022-01-01');
    const søknadsperiodeInnenfor: DateRange = ISODateRangeToDateRange('2022-01-02/2022-02-01');

    it('returnerer true dersom søknadsperioder er innenfor tillatt endringsperiode', () => {
        const result = tilgangskontrollUtils.harSøknadsperiodeInnenforTillattEndringsperiode(
            søknadsperiodeInnenfor,
            tillatEndringsperiode
        );
        expect(result).toBeTruthy();
    });

    it('returnerer false dersom søknadsperioder er før tillatt endringsperiode', () => {
        const result = tilgangskontrollUtils.harSøknadsperiodeInnenforTillattEndringsperiode(
            søknadsperiodeUtenfor,
            tillatEndringsperiode
        );
        expect(result).toBeFalsy();
    });
});
