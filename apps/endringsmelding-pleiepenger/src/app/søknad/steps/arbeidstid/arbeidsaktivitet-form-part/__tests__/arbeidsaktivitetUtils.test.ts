import { ISODateRange } from '@navikt/sif-common-utils';
import { ArbeidstidEndringMap, Arbeidsuke, TimerEllerProsent } from '@types';
import { getEndringerForArbeidsukeForm } from '../arbeidsaktivitetUtils';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getEnv: () => '', getCommonEnv: () => ({}) };
});

describe('arbeidsaktivitetUtils', () => {
    describe('getEndringerForArbeidsukeForm', () => {
        const uke1: ISODateRange = '2023-01-02/2023-01-08';
        const uke2: ISODateRange = '2023-01-09/2023-01-15';
        const uke3: ISODateRange = '2023-01-16/2023-01-22';

        const arbUke1: Arbeidsuke = { isoDateRange: uke1 } as Arbeidsuke;
        const arbUke2: Arbeidsuke = { isoDateRange: uke2 } as Arbeidsuke;
        const arbUke3: Arbeidsuke = { isoDateRange: uke3 } as Arbeidsuke;

        const endringer: ArbeidstidEndringMap = {
            [uke1]: {
                prosent: 20,
                type: TimerEllerProsent.PROSENT,
            },
            [uke2]: {
                prosent: 20,
                type: TimerEllerProsent.PROSENT,
            },
            [uke3]: {
                prosent: 22,
                type: TimerEllerProsent.PROSENT,
            },
        };

        it('returnerer én endring hvis alle endringer er like', () => {
            const result = getEndringerForArbeidsukeForm([arbUke1, arbUke2], endringer);
            expect(result).toBeDefined();
        });
        it('returnerer undefined hvis noen endringer er ulike', () => {
            const result = getEndringerForArbeidsukeForm([arbUke1, arbUke2, arbUke3], endringer);
            expect(result).toBeUndefined();
        });
        it('returnerer én endring hvis det bare er én arbeidsuke, og endring finnes', () => {
            const result = getEndringerForArbeidsukeForm([arbUke1], endringer);
            expect(result).toBeDefined();
        });
        it('returnerer undefined hvis det bare er én arbeidsuke, og ingen endring finnes', () => {
            const result = getEndringerForArbeidsukeForm([arbUke1], {});
            expect(result).toBeUndefined();
        });
    });
});
