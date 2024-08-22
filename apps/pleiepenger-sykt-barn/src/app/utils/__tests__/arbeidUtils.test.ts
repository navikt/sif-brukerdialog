import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../types/RedusertArbeidstidType';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { harFraværFraJobb } from '../arbeidUtils';

describe('arbeidUtils', () => {
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
                    }),
                ).toBeTruthy();
                expect(
                    harFraværFraJobb({
                        ...arbeidsgivereArbeiderRedusert,
                    }),
                ).toBeTruthy();
            });
            it('returnerer true når en er ansatt flere steder og har fravær ett sted', () => {
                const arbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata> = new Map();
                arbeidsgivere.set('1', { type: ArbeidIPeriodeType.arbeiderIkke });
                arbeidsgivere.set('2', { type: ArbeidIPeriodeType.arbeiderVanlig });
                expect(
                    harFraværFraJobb({
                        arbeidsgivere,
                    }),
                ).toBeTruthy();
            });
            it('returnerer false når en jobber som vanlig hos alle', () => {
                const arbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata> = new Map();
                arbeidsgivere.set('1', { type: ArbeidIPeriodeType.arbeiderVanlig });
                arbeidsgivere.set('2', { type: ArbeidIPeriodeType.arbeiderVanlig });
                expect(
                    harFraværFraJobb({
                        arbeidsgivere,
                    }),
                ).toBeFalsy();
            });
        });
        describe('frilanser', () => {
            it('returnerer true når det er fravær fra frilansarbeid', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        frilans: arbeiderIkke,
                    }),
                ).toBeTruthy();
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        frilans: arbeiderRedusert,
                    }),
                ).toBeTruthy();
            });
            it('returnerer false når en jobber som vanlig', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        frilans: arbeiderVanlig,
                    }),
                ).toBeFalsy();
            });
        });

        describe('selvstendig', () => {
            it('returnerer true når det er fravær fra selvstendig', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        selvstendig: arbeiderIkke,
                    }),
                ).toBeTruthy();
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        selvstendig: arbeiderRedusert,
                    }),
                ).toBeTruthy();
            });
            it('returnerer false når en jobber som vanlig', () => {
                expect(
                    harFraværFraJobb({
                        arbeidsgivere: new Map(),
                        selvstendig: arbeiderVanlig,
                    }),
                ).toBeFalsy();
            });
        });
        describe('kombinasjoner', () => {
            it('returnerer true dersom en jobber som vanlig alle steder unntatt hos én', () => {
                expect(
                    harFraværFraJobb({
                        ...arbeidsgivereArbeiderIkke,
                        frilans: arbeiderVanlig,
                        selvstendig: arbeiderVanlig,
                    }),
                ).toBeTruthy();
            });
            it('returnerer false dersom en jobber som vanlig alle steder', () => {
                expect(
                    harFraværFraJobb({
                        ...arbeidsgivereArbeiderVanlig,
                        frilans: arbeiderVanlig,
                        selvstendig: arbeiderVanlig,
                    }),
                ).toBeFalsy();
            });
        });
    });
});
