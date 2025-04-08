import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { vi } from 'vitest';
import { cleanupFosterhjemsgodtgjørelse } from '../cleanupFosterhjemsgodtgjørelse';
import { FosterhjemsgodtgjørelseFormValues } from '../../../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';
import { TimerEllerProsent } from '../../../../types';

const ISOStartdato = '2021-01-01';
const ISOSluttdato = '2022-01-01';

const formValues: FosterhjemsgodtgjørelseFormValues = {
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES,
    mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.NO,
    erFrikjøptFraJobb: YesOrNo.YES,
    frikjøptTimerEllerProsent: TimerEllerProsent.PROSENT,
    frikjøptProsent: '50',
    startdato: ISOStartdato,
    sluttdato: ISOSluttdato,
    slutterUnderveis: YesOrNo.YES,
    starterUndeveis: YesOrNo.YES,
};

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getMaybeEnv: () => '' };
});

describe('cleanupFosterhjemsgodtgjørelse', () => {
    it('mottar ikke Fosterhjemsgodtgjørelse', () => {
        const { mottarFosterhjemsgodtgjørelse, ...rest } = cleanupFosterhjemsgodtgjørelse({
            ...formValues,
            mottarFosterhjemsgodtgjørelse: YesOrNo.NO,
        });
        expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    it('mottar Fosterhjemsgodtgjørelse men er ikke frikjøpt', () => {
        const { mottarFosterhjemsgodtgjørelse, erFrikjøptFraJobb, ...rest } = cleanupFosterhjemsgodtgjørelse({
            ...formValues,
            mottarFosterhjemsgodtgjørelse: YesOrNo.YES,
            erFrikjøptFraJobb: YesOrNo.NO,
        });
        expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.YES);
        expect(erFrikjøptFraJobb).toEqual(YesOrNo.NO);
        expect(rest).toEqual({});
    });
    describe('mottar Fosterhjemsgodtgjørelse', () => {
        it('mottar hele perioden - oppgir timer', () => {
            const {
                mottarFosterhjemsgodtgjørelse,
                erFrikjøptFraJobb,
                frikjøptTimerEllerProsent,
                frikjøptTimer,
                mottarFosterhjemsgodtgjørelseIHelePerioden,
                ...rest
            } = cleanupFosterhjemsgodtgjørelse({
                ...formValues,
                frikjøptTimer: '10',
                frikjøptTimerEllerProsent: TimerEllerProsent.TIMER,
                mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.YES,
                erFrikjøptFraJobb: YesOrNo.YES,
            });
            expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.YES);
            expect(erFrikjøptFraJobb).toEqual(YesOrNo.YES);
            expect(mottarFosterhjemsgodtgjørelseIHelePerioden).toEqual(YesOrNo.YES);
            expect(frikjøptTimerEllerProsent).toEqual(TimerEllerProsent.TIMER);
            expect(frikjøptTimer).toEqual('10');
            expect(rest).toEqual({});
        });
        it('starter og slutter i perioden', () => {
            const {
                mottarFosterhjemsgodtgjørelse,
                mottarFosterhjemsgodtgjørelseIHelePerioden,
                starterUndeveis,
                slutterUnderveis,
                startdato,
                sluttdato,
                erFrikjøptFraJobb,
                frikjøptProsent,
                frikjøptTimerEllerProsent,
                ...rest
            } = cleanupFosterhjemsgodtgjørelse({
                ...formValues,
                mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.NO,
                starterUndeveis: YesOrNo.YES,
                slutterUnderveis: YesOrNo.YES,
            });
            expect(mottarFosterhjemsgodtgjørelse).toEqual(YesOrNo.YES);
            expect(mottarFosterhjemsgodtgjørelseIHelePerioden).toEqual(YesOrNo.NO);
            expect(starterUndeveis).toEqual(YesOrNo.YES);
            expect(slutterUnderveis).toEqual(YesOrNo.YES);
            expect(startdato).toEqual(ISOStartdato);
            expect(sluttdato).toEqual(ISOSluttdato);
            expect(frikjøptTimerEllerProsent).toEqual(TimerEllerProsent.PROSENT);
            expect(frikjøptProsent).toEqual('50');
            expect(rest).toEqual({});
        });
    });
});
