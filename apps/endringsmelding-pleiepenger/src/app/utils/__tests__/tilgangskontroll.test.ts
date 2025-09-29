import { DateRange, ISODateRangeToDateRange, ISODurationToDuration } from '@navikt/sif-common-utils';
import { ArbeidsgiverMedAnsettelseperioder, K9SakArbeidstaker, K9SakArbeidstidPeriodeMap } from '@types';
import { vi } from 'vitest';

import { tilgangskontroll, tilgangskontrollUtils } from '../tilgangskontroll';

const ansettelsesperioder: DateRange[] = [ISODateRangeToDateRange('2022-01-01/2023-03-01')];

const arbeidsgiver1: ArbeidsgiverMedAnsettelseperioder = {
    key: 'a_1',
    navn: 'a_1',
    ansettelsesperioder,
    organisasjonsnummer: '1',
};
const arbeidsgiver2: ArbeidsgiverMedAnsettelseperioder = {
    key: 'a_2',
    navn: 'a_2',
    ansettelsesperioder,
    organisasjonsnummer: '2',
};

const arbeidsgiverFlereAnsettelsesperioder: ArbeidsgiverMedAnsettelseperioder = {
    key: 'a_4',
    navn: 'a_4',
    ansettelsesperioder: [
        ISODateRangeToDateRange('2022-01-01/2023-02-01'),
        ISODateRangeToDateRange('2023-02-01/2023-03-01'),
    ],
    organisasjonsnummer: '4',
} as ArbeidsgiverMedAnsettelseperioder;

const arbeidstaker1: K9SakArbeidstaker = { organisasjonsnummer: '1' } as K9SakArbeidstaker;
const arbeidstaker2: K9SakArbeidstaker = { organisasjonsnummer: '2' } as K9SakArbeidstaker;

vi.mock('@navikt/sif-common-env', () => ({
    getRequiredEnv: () => {
        return false;
    },
}));

vi.mock('../featureToggleUtils', () => ({
    Feature: {
        UKJENT_ARBEIDSFOHOLD: 'on',
    },
    isFeatureEnabled: () => {
        return true;
    },
}));

describe('tilgangskontroll', () => {
    const tillattEndringsperiode = ISODateRangeToDateRange('2022-01-01/2023-03-01');

    it('stopper ved ingen sak', () => {
        const result = tilgangskontroll([], tillattEndringsperiode, []);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
    it('stopper hvis bruker har flere enn én sak', () => {
        const result = tilgangskontroll([true, false] as any, tillattEndringsperiode, []);
        expect(result.kanBrukeSøknad).toBeFalsy();
    });
});

describe('harFlereAnsettelsesforholdHosUkjentArbeidsgiver', () => {
    /** TODO - oppdatere */
    it('returnerer true hvis arbeidsgiver ikke har arbeidsaktivitet i sak og har flere ansettelseperioder', () => {
        const result = tilgangskontrollUtils.harFlereAnsettelsesforholdHosUkjentArbeidsgiver(
            [arbeidsgiverFlereAnsettelsesperioder],
            [arbeidstaker1, arbeidstaker2],
        );
        expect(result).toBeTruthy();
    });
    it('returnerer false hvis alle arbeidsgivere har arbeidsaktivitet i sak', () => {
        const result = tilgangskontrollUtils.harFlereAnsettelsesforholdHosUkjentArbeidsgiver(
            [arbeidsgiver1, arbeidsgiver2],
            [arbeidstaker1, arbeidstaker2],
        );
        expect(result).toBeFalsy();
    });
    it('returnerer true hvis arbeidsgiver ikke har arbeidsaktivitet i sak men har kun én ansettelseperiode', () => {
        const result = tilgangskontrollUtils.harFlereAnsettelsesforholdHosUkjentArbeidsgiver(
            [arbeidsgiver1],
            [arbeidstaker1],
        );
        expect(result).toBeFalsy();
    });
});

describe('harSakSøknadsperiodeInnenforTillattEndringsperiode', () => {
    const tillattEndringsperiode = ISODateRangeToDateRange('2022-01-02/2022-02-01');
    const søknadsperiodeUtenfor: DateRange = ISODateRangeToDateRange('2022-01-01/2022-01-01');
    const søknadsperiodeInnenfor: DateRange = ISODateRangeToDateRange('2022-01-02/2022-02-01');

    it('returnerer true hvis søknadsperioder er innenfor tillatt endringsperiode', () => {
        const result = tilgangskontrollUtils.harSøknadsperiodeInnenforTillattEndringsperiode(
            søknadsperiodeInnenfor,
            tillattEndringsperiode,
        );
        expect(result).toBeTruthy();
    });

    it('returnerer false hvis søknadsperioder er før tillatt endringsperiode', () => {
        const result = tilgangskontrollUtils.harSøknadsperiodeInnenforTillattEndringsperiode(
            søknadsperiodeUtenfor,
            tillattEndringsperiode,
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
    it('returnerer erFrilanser:false hvis bruker ikke har timer som frilanser', () => {
        const result = tilgangskontrollUtils.getIngenTilgangMeta({
            arbeidstakerList: [],
            frilanserArbeidstidInfo: { perioder: perioderIngenTid },
            selvstendigNæringsdrivendeArbeidstidInfo: { perioder: perioder },
        });
        expect(result.erFrilanser).toBeFalsy();
    });
    it('returnerer erFrilanser:true hvis bruker har timer som frilanser', () => {
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

describe('slutterOgStarterHosArbeidsgiverSammeUke', () => {
    const uke2: DateRange = ISODateRangeToDateRange('2025-01-06/2025-01-12');
    const uke4: DateRange = ISODateRangeToDateRange('2025-01-20/2025-01-26');
    const uke3ManOns: DateRange = ISODateRangeToDateRange('2025-01-13/2025-01-15');
    const uke3TorFre: DateRange = ISODateRangeToDateRange('2025-01-16/2025-01-17');
    const uke3FreSøn: DateRange = ISODateRangeToDateRange('2025-01-17/2025-01-19');

    it('returnerer false hvis det ikke er noen ansettelsesperiode', () => {
        expect(tilgangskontrollUtils.perioderSlutterOgStarterSammeUkeMedOpphold([])).toBeFalsy();
    });
    it('returnerer false hvis det bare er én ansettelsesperiode', () => {
        expect(tilgangskontrollUtils.perioderSlutterOgStarterSammeUkeMedOpphold([uke2])).toBeFalsy();
    });
    it('returnerer false hvis det to ansettelsesperiode med én uke mellom', () => {
        expect(tilgangskontrollUtils.perioderSlutterOgStarterSammeUkeMedOpphold([uke2, uke4])).toBeFalsy();
    });
    it('returnerer false hvis det to ansettelsesperiode med er sammenhengende', () => {
        expect(tilgangskontrollUtils.perioderSlutterOgStarterSammeUkeMedOpphold([uke3ManOns, uke3TorFre])).toBeFalsy();
    });
    it('returnerer true hvis to perioder slutter og starter innenfor samme uke men med opphold', () => {
        expect(tilgangskontrollUtils.perioderSlutterOgStarterSammeUkeMedOpphold([uke3ManOns, uke3FreSøn])).toBeTruthy();
    });
    it('returnerer true hvis to det er mange perioder usortert og noen slutter og starter innenfor samme uke men med opphold', () => {
        expect(
            tilgangskontrollUtils.perioderSlutterOgStarterSammeUkeMedOpphold([uke2, uke4, uke3ManOns, uke3FreSøn]),
        ).toBeTruthy();
    });
});
