/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { durationToISODuration } from '@navikt/sif-common-utils/lib';
import {
    ArbeidsgiverApiData,
    TidEnkeltdagApiData,
    TimerFasteDagerApiData,
} from '../../../types/søknad-api-data/SøknadApiData';
import {
    arbeidsgiverHarOrganisasjonsnummer,
    mapTidEnkeltdagApiDataToDateDurationMap,
    mapTimerFasteDagerToDurationWeekdays,
} from '../extractFormValuesUtils';

describe('mapTidEnkeltdagApiDataToDateDurationMap', () => {
    const data: TidEnkeltdagApiData[] = [
        {
            dato: '2021-01-01',
            tid: 'PT01H50M',
        },
        {
            dato: '2021-01-02',
            tid: 'PT01H20M',
        },
    ];
    it('mapper om alle dager korrekt', () => {
        const result = mapTidEnkeltdagApiDataToDateDurationMap(data);
        expect(Object.keys(result)).toHaveLength(2);
        const r1 = result['2021-01-01'];
        const r2 = result['2021-01-02'];
        expect(r1.hours).toEqual('1');
        expect(r1.minutes).toEqual('50');
        expect(r2.hours).toEqual('1');
        expect(r2.minutes).toEqual('20');
    });
    it('fjerner dager som ikke har riktig format', () => {
        const result = mapTidEnkeltdagApiDataToDateDurationMap([{ dato: '2021-01-01', tid: 'abc' }]);
        expect(Object.keys(result)).toHaveLength(0);
    });
});

describe('mapTimerFasteDagerToDurationWeekdays', () => {
    const timer: TimerFasteDagerApiData = {
        mandag: 'PT1H0M',
        tirsdag: 'PT2H0M',
        onsdag: 'PT3H30M',
        torsdag: 'PT4H0M',
        fredag: 'PT5H0M',
    };
    it('returnerer riktig for uke mer timer hver dag', () => {
        const result = mapTimerFasteDagerToDurationWeekdays(timer);
        expect(durationToISODuration(result.monday!)).toEqual('PT1H0M');
        expect(durationToISODuration(result.tuesday!)).toEqual('PT2H0M');
        expect(durationToISODuration(result.wednesday!)).toEqual('PT3H30M');
        expect(durationToISODuration(result.thursday!)).toEqual('PT4H0M');
        expect(durationToISODuration(result.friday!)).toEqual('PT5H0M');
    });
    it('returnerer riktig for tom uke', () => {
        const result = mapTimerFasteDagerToDurationWeekdays({});
        expect(result.monday).toBeUndefined();
        expect(result.tuesday).toBeUndefined();
        expect(result.wednesday).toBeUndefined();
        expect(result.thursday).toBeUndefined();
        expect(result.friday).toBeUndefined();
    });
});

describe('arbeidsgiverHarOrganisasjonsnummer', () => {
    it('returnerer true når det er et org-nummer', () => {
        expect(arbeidsgiverHarOrganisasjonsnummer({ organisasjonsnummer: '234' } as ArbeidsgiverApiData)).toBeTruthy();
    });
    it('returnerer false når det ikke er ett org-nummer', () => {
        expect(arbeidsgiverHarOrganisasjonsnummer({} as ArbeidsgiverApiData)).toBeFalsy();
    });
});
