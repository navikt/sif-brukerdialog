import { DateRange, ISODateRangeToDateRange, ISODurationToDuration } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';
import { K9Sak, K9SakArbeidstaker, K9SakArbeidstidPeriodeMap } from '../../types/K9Sak';
import { tilgangskontroll, tilgangskontrollUtils } from '../tilgangskontroll';

const arbeidsgiver1: Arbeidsgiver = { key: 'a_1', organisasjonsnummer: '1' } as Arbeidsgiver;
const arbeidsgiver2: Arbeidsgiver = { key: 'a_2', organisasjonsnummer: '2' } as Arbeidsgiver;
const arbeidsgiver3: Arbeidsgiver = { key: 'a_3', organisasjonsnummer: '3' } as Arbeidsgiver;

const arbeidstaker1: K9SakArbeidstaker = { organisasjonsnummer: '1' } as K9SakArbeidstaker;
const arbeidstaker2: K9SakArbeidstaker = { organisasjonsnummer: '2' } as K9SakArbeidstaker;

jest.mock('@navikt/sif-common-core-ds/lib/utils/envUtils', () => ({
    getEnvironmentVariable: () => {
        return false;
    },
}));

jest.mock('../featureToggleUtils', () => ({
    Feature: {
        UKJENT_ARBEIDSGIVER: 'on',
    },
    isFeatureEnabled: () => {
        return true;
    },
}));

describe('tilgangskontroll', () => {
    const tillattEndringsperiode = ISODateRangeToDateRange('2022-01-01/2023-03-01');

    it('stopper ved ingen sak', () => {
        const result = tilgangskontroll([], [], tillattEndringsperiode);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
    it('stopper hvis bruker har flere enn én sak', () => {
        const result = tilgangskontroll([true, false] as any, [], tillattEndringsperiode);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
    // it('stopper hvis bruker har arbeidsgiver som ikke er i sak', () => {
    //     const sak: K9Sak = {
    //         ytelse: {
    //             arbeidstid: {
    //                 arbeidstakerList: [
    //                     {
    //                         organisasjonsnummer: '2',
    //                     },
    //                 ],
    //             },
    //             søknadsperioder: [ISODateRangeToDateRange('2022-01-01/2023-10-01')],
    //         },
    //     } as K9Sak;
    //     const result = tilgangskontroll([sak], [arbeidsgiver1], tillattEndringsperiode);
    //     expect(result.kanBrukeSøknad).toBeFalsy();
    //     if (result.kanBrukeSøknad === false) {
    //         expect(result.årsak).toContain(IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet);
    //     }
    // });
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
                søknadsperioder: [ISODateRangeToDateRange('2022-01-01/2023-10-01')],
            },
        } as K9Sak;
        const result = tilgangskontroll([sak], [arbeidsgiver1], tillattEndringsperiode);
        expect(result.kanBrukeSøknad).toBeFalsy();
        if (result.kanBrukeSøknad === false) {
            expect(result.årsak).toContain(IngenTilgangÅrsak.harArbeidsaktivitetUtenArbeidsgiver);
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

describe('ingenTilgangMeta', () => {
    const perioder: K9SakArbeidstidPeriodeMap = {
        '2020-01-01/2020-02-01': {
            faktiskArbeidTimerPerDag: ISODurationToDuration('PT10H0M'),
            jobberNormaltTimerPerDag: ISODurationToDuration('PT10H0M'),
        },
    };
    const perioderIngenTid: K9SakArbeidstidPeriodeMap = {
        '2020-01-01/2020-02-01': {
            faktiskArbeidTimerPerDag: ISODurationToDuration('PT0H0M'),
            jobberNormaltTimerPerDag: ISODurationToDuration('PT0H0M'),
        },
    };
    const arbeidstaker: K9SakArbeidstaker = {
        arbeidstidInfo: { perioder },
        organisasjonsnummer: '234',
    };

    it('returnerer erArbeidstaker: true når bruker er arbeidstaker', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [arbeidstaker],
        });
        expect(result.erArbeidstaker).toBeTruthy();
    });
    it('returnerer erArbeidstaker: false når bruker ikke er arbeidstaker', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [],
        });
        expect(result.erArbeidstaker).toBeFalsy();
    });
    it('returnerer erFrilanser:false dersom bruker ikke har timer som frilanser', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [],
            frilanserArbeidstidInfo: { perioder: perioderIngenTid },
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder: perioder },
        });
        expect(result.erFrilanser).toBeFalsy();
    });
    it('returnerer erFrilanser:true dersom bruker har timer som frilanser', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [],
            frilanserArbeidstidInfo: { perioder: perioder },
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder: perioder },
        });
        expect(result.erFrilanser).toBeTruthy();
    });
    it('returnerer erSN: true når bruker er SN', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder },
        });
        expect(result.erSN).toBeTruthy();
    });
    it('returnerer erSN: false når bruker ikke er SN', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            selvstendigNæringsdrivendeArbeidstidInfo: undefined,
        });
        expect(result.erSN).toBeFalsy();
    });
    it('returnerer riktig når bruker er alt', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [arbeidstaker],
            frilanserArbeidstidInfo: { perioder: perioder },
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder },
        });
        expect(result.erArbeidstaker).toBeTruthy();
        expect(result.erFrilanser).toBeTruthy();
        expect(result.erSN).toBeTruthy();
    });
});
