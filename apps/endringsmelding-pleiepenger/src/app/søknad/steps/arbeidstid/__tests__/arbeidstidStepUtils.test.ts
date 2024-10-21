import { vi } from 'vitest';
import { ArbeiderIPeriodenSvar, TimerEllerProsent } from '../../../../types';
import { getArbeidstidSøknadsdataFromFormValues } from '../arbeidstidStepUtils';

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getEnv: () => '', getCommonEnv: () => ({}), getSifInnsynBrowserEnv: () => ({}) };
});

describe('arbeidstidStepUtils', () => {
    describe('getArbeidstidSøknadsdataFromFormValues', () => {
        const isoDateRange = '2020-01-01/2020-02-01';
        it('oppretter ikke endringer dersom formValues.endringer er tomt objekt - en aktivitet', () => {
            const result = getArbeidstidSøknadsdataFromFormValues({ arbeidsaktivitet: { abc: { endringer: {} } } });
            expect(result.arbeidsaktivitet).toEqual({});
        });
        it('oppretter ikke endringer dersom formValues.endringer er tomt objekt - to aktivitet', () => {
            const result = getArbeidstidSøknadsdataFromFormValues({
                arbeidsaktivitet: { abc: { endringer: {} }, org2: { endringer: {} } },
            });
            expect(result.arbeidsaktivitet).toEqual({});
        });
        it('oppretter endringer for aktiviteter med endring, fjerner andre', () => {
            const result = getArbeidstidSøknadsdataFromFormValues({
                arbeidsaktivitet: {
                    org1: { endringer: {} },
                    org2: { endringer: { [isoDateRange]: { type: TimerEllerProsent.PROSENT, prosent: 20 } } },
                },
            });
            expect(result.arbeidsaktivitet.org1).toBeUndefined();
            const endringer = result.arbeidsaktivitet.org2.endringer;
            expect(endringer).toBeDefined();
            expect(Object.keys(endringer).length).toBe(1);
            expect(endringer[isoDateRange]).toBeDefined();
        });
        describe('miks av kjente og ukjente aktiviteter', () => {
            const result = getArbeidstidSøknadsdataFromFormValues({
                arbeidsaktivitet: {
                    org1: {
                        endringer: {},
                        arbeiderIPerioden: undefined,
                    },
                    org2: {
                        endringer: { [isoDateRange]: { type: TimerEllerProsent.PROSENT, prosent: 20 } },
                    },
                    org3_vanlig: {
                        endringer: { [isoDateRange]: { type: TimerEllerProsent.PROSENT, prosent: 20 } },
                        arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
                    },
                    org4_redusert: {
                        endringer: { [isoDateRange]: { type: TimerEllerProsent.PROSENT, prosent: 20 } },
                        arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                    },
                    org5_heltFravær: {
                        endringer: { [isoDateRange]: { type: TimerEllerProsent.PROSENT, prosent: 20 } },
                        arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
                    },
                },
            });
            it('tar ikke med kjent aktivitet med ingen endring', () => {
                expect(result.arbeidsaktivitet.org1).toBeUndefined();
            });
            it('tar med kjent aktivitet som har endring', () => {
                const arbg = result.arbeidsaktivitet.org2;
                expect(arbg).toBeDefined();
                expect(arbg.endringer).toBeDefined();
                expect(Object.keys(arbg.endringer).length).toBe(1);
                expect(arbg.endringer[isoDateRange]).toBeDefined();
                expect(arbg.arbeiderIPerioden).toBeUndefined();
            });
            it('tar med ukjent aktivitet hvor en jobber som vanlig', () => {
                const arbg = result.arbeidsaktivitet.org3_vanlig;
                expect(arbg).toBeDefined();
                expect(arbg.endringer).toEqual({});
                expect(arbg.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.somVanlig);
            });
            it('tar med ukjent aktivitet hvor en har helt fravær', () => {
                const arbg = result.arbeidsaktivitet.org5_heltFravær;
                expect(arbg).toBeDefined();
                expect(arbg.endringer).toEqual({});
                expect(arbg.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.heltFravær);
            });
            it('tar med ukjent aktivitet hvor en kombinerer pleiepenger og arbeid', () => {
                const arbg = result.arbeidsaktivitet.org4_redusert;
                expect(arbg).toBeDefined();
                expect(arbg.endringer).toBeDefined();
                expect(Object.keys(arbg.endringer).length).toBe(1);
                expect(arbg.endringer[isoDateRange]).toBeDefined();
                expect(arbg.arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
            });
        });
    });
});
