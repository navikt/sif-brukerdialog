import { TimerEllerProsent } from '../../types';
import { harEndretArbeidstid } from '../søknadsdataUtils';

describe('søknadsdata', () => {
    describe('harEndretArbeidstid', () => {
        it('returnerer false når arbeidstid er undefined', () => {
            expect(harEndretArbeidstid(undefined)).toBeFalsy();
        });
        it('returnerer false dersom arbeidstid har aktiviteter men endringer har ingen elementer', () => {
            expect(
                harEndretArbeidstid({
                    arbeidsaktivitet: {
                        abc: {
                            endringer: {},
                        },
                    },
                })
            ).toBeFalsy();
        });
        it('returnerer true dersom arbeidstid har aktiviteter og endringer har elementer', () => {
            expect(
                harEndretArbeidstid({
                    arbeidsaktivitet: {
                        abc: {
                            endringer: {
                                sdf: { type: TimerEllerProsent.PROSENT, prosent: 20 },
                            },
                        },
                    },
                })
            ).toBeTruthy();
        });
    });
});
