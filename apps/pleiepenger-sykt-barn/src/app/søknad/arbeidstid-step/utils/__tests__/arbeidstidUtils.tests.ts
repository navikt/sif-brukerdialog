/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import {
    ArbeidsperiodeIForholdTilSøknadsperiode,
    getArbeidsperiodeIForholdTilSøknadsperiode,
    harFraværFraJobb,
    summerArbeidstimerIArbeidsuker,
} from '../arbeidstidUtils';
import { ArbeidIPeriodeSøknadsdata } from '../../../../types/søknadsdata/_ArbeidIPeriodeSøknadsdata';
import { RedusertArbeidstidType } from '../../../../types/_RedusertArbeidstidType';
import { ArbeidIPeriodeType } from '../../../../types/_ArbeidIPeriodeType';
import { ArbeidstidSøknadsdata } from '../../../../types/søknadsdata/_ArbeidstidSøknadsdata';

describe('arbeidstidUtils', () => {
    describe('harFraværFraJobb', () => {
        const arbeiderIkke: ArbeidIPeriodeSøknadsdata = {
            type: ArbeidIPeriodeType.arbeiderIkke,
        };
        const arbeiderVanlig: ArbeidIPeriodeSøknadsdata = {
            type: ArbeidIPeriodeType.arbeiderVanlig,
        };
        const arbeiderRedusert: ArbeidIPeriodeSøknadsdata = {
            type: ArbeidIPeriodeType.arbeiderRedusert,
            redusertArbeid: {
                type: RedusertArbeidstidType.prosentAvNormalt,
                prosentAvNormalt: 20,
            },
        };

        // const arbeidsgivereEnArbeidsgiver: Map<string, ArbeidIPeriodeSøknadsdata> = new Map();
        // arbeidsgivere.

        const arbeidsgivereArbeiderIkke: ArbeidstidSøknadsdata = {
            arbeidsgivere: new Map([['123', arbeiderIkke]]),
        };
        const arbeidsgivereArbeiderRedusert: ArbeidstidSøknadsdata = {
            arbeidsgivere: new Map([['123', arbeiderRedusert]]),
        };
        const arbeidsgivereArbeiderVanlig: ArbeidstidSøknadsdata = {
            arbeidsgivere: new Map([['123', arbeiderVanlig]]),
        };

        describe('kun ansatt', () => {
            it('returnerer true når det er fravær som ansatt', () => {
                expect(
                    harFraværFraJobb({
                        ...arbeidsgivereArbeiderIkke,
                    })
                ).toBeTruthy();
                expect(
                    harFraværFraJobb({
                        ...arbeidsgivereArbeiderRedusert,
                    })
                ).toBeTruthy();
            });
            it('returnerer true når en er ansatt flere steder og har fravær ett sted', () => {
                const arbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata> = new Map();
                arbeidsgivere.set('1', { type: ArbeidIPeriodeType.arbeiderIkke });
                arbeidsgivere.set('2', { type: ArbeidIPeriodeType.arbeiderVanlig });
                expect(
                    harFraværFraJobb({
                        arbeidsgivere,
                    })
                ).toBeTruthy();
            });
            it('returnerer false når en jobber som vanlig hos alle', () => {
                const arbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata> = new Map();
                arbeidsgivere.set('1', { type: ArbeidIPeriodeType.arbeiderVanlig });
                arbeidsgivere.set('2', { type: ArbeidIPeriodeType.arbeiderVanlig });
                expect(
                    harFraværFraJobb({
                        arbeidsgivere,
                    })
                ).toBeFalsy();
            });
        });
        describe('frilansarbeid', () => {
            it('returnerer true når det er fravær fra frilansarbeid', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        frilansarbeid: arbeiderIkke,
                    })
                ).toBeTruthy();
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        frilansarbeid: arbeiderRedusert,
                    })
                ).toBeTruthy();
            });
            it('returnerer false når en jobber som vanlig', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        frilansarbeid: arbeiderVanlig,
                    })
                ).toBeFalsy();
            });
        });
        describe('honorararbeid', () => {
            it('returnerer true når det er fravær fra honorararbeid', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        honorararbeid: arbeiderIkke,
                    })
                ).toBeTruthy();
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        honorararbeid: arbeiderRedusert,
                    })
                ).toBeTruthy();
            });
            it('returnerer false når en jobber som vanlig', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        honorararbeid: arbeiderVanlig,
                    })
                ).toBeFalsy();
            });
        });
        describe('selvstendig', () => {
            it('returnerer true når det er fravær fra selvstendig', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        selvstendig: arbeiderIkke,
                    })
                ).toBeTruthy();
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        selvstendig: arbeiderRedusert,
                    })
                ).toBeTruthy();
            });
            it('returnerer false når en jobber som vanlig', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        selvstendig: arbeiderVanlig,
                    })
                ).toBeFalsy();
            });
        });
        describe('kombinasjoner', () => {
            it('returnerer true dersom en jobber som vanlig alle steder unntatt hos én ', () => {
                expect(
                    harFraværFraJobb({
                        ...arbeidsgivereArbeiderIkke,
                        honorararbeid: arbeiderVanlig,
                        frilansarbeid: arbeiderVanlig,
                        selvstendig: arbeiderVanlig,
                    })
                ).toBeTruthy();
            });
            it('returnerer false dersom en jobber som vanlig alle steder', () => {
                expect(
                    harFraværFraJobb({
                        ...arbeidsgivereArbeiderVanlig,
                        honorararbeid: arbeiderVanlig,
                        frilansarbeid: arbeiderVanlig,
                        selvstendig: arbeiderVanlig,
                    })
                ).toBeFalsy();
            });
        });
    });

    describe('summerArbeidstimerIArbeidsuker', () => {
        const periode = ISODateRangeToDateRange('2022-01-03/2022-01-09');
        it('returnerer 0 ved 0 timer', () => {
            const result = summerArbeidstimerIArbeidsuker([{ periode, timer: 0 }]);
            expect(result).toEqual(0);
        });
        it('summerer riktig', () => {
            const result = summerArbeidstimerIArbeidsuker([
                { periode, timer: 1 },
                { periode, timer: 2 },
                { periode, timer: 3 },
            ]);
            expect(result).toEqual(6);
        });
    });

    describe('getArbeidsperiodeIForholdTilSøknadsperiode', () => {
        const mandag: Date = ISODateToDate('2022-01-03');
        const tirsdag: Date = ISODateToDate('2022-01-04');
        const torsdag: Date = ISODateToDate('2022-01-06');
        const fredag: Date = ISODateToDate('2022-01-07');

        it('returnerer starterIPerioden når arbeidsperiode starter i søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: tirsdag,
                to: fredag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.starterIPerioden
            );
        });
        it('returnerer slutterIPerioden når arbeidsperiode slutter i søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: mandag,
                to: torsdag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.slutterIPerioden
            );
        });
        it('returnerer starterOgSlutterIPerioden når arbeidsperiode starter og slutter i søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: tirsdag,
                to: torsdag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.starterOgSlutterIPerioden
            );
        });
        it('returnerer gjelderHelePerioden når arbeidsperiode starter og slutter samme dager som søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.gjelderHelePerioden
            );
        });
    });
});
