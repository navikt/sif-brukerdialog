/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeType } from '../../../types/arbeidIPeriodeType';
import { ArbeidIPeriodeApiData } from '../../../types/søknad-api-data/arbeidIPeriodeApiData';
import {
    mapArbeidIPeriodeApiDataProsentToFormValues,
    mapArbeidIPeriodeApiDataTimerPerUkeToFormValues,
    mapArbeidIPeriodeApiDataToFormValues,
} from '../mapArbeidIPeriodeToFormValues';

describe('mapArbeidIPeriodeApiDataToFormValues', () => {
    it('returnerer riktig når en ikke arbeider i perioden', () => {
        const arbeid: ArbeidIPeriodeApiData = {
            type: ArbeidIPeriodeType.arbeiderIkke,
            arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
        };
        expect(mapArbeidIPeriodeApiDataToFormValues(arbeid)!.arbeiderIPerioden).toEqual(
            ArbeiderIPeriodenSvar.heltFravær
        );
    });
    it('returnerer riktig når en jobber som vanlig i perioden', () => {
        const arbeid: ArbeidIPeriodeApiData = {
            type: ArbeidIPeriodeType.arbeiderVanlig,
            arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
        };
        expect(mapArbeidIPeriodeApiDataToFormValues(arbeid)!.arbeiderIPerioden).toEqual(
            ArbeiderIPeriodenSvar.somVanlig
        );
    });
    describe('arbeid timer per uke', () => {
        it('returnerer riktig når en arbeider timer per uke', () => {
            const arbeid: ArbeidIPeriodeApiData = {
                type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                timerPerUke: 'PT20H30M',
            };
            const { timerEllerProsent, snittTimerPerUke, arbeiderIPerioden } =
                mapArbeidIPeriodeApiDataTimerPerUkeToFormValues(arbeid);
            expect(arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
            expect(timerEllerProsent).toEqual(TimerEllerProsent.TIMER);
            expect(snittTimerPerUke).toEqual('20,5');
        });
    });
    describe('arbeid prosent av vanlig', () => {
        it('returnerer riktig når en arbeider prosent av vanlig', () => {
            const arbeid: ArbeidIPeriodeApiData = {
                type: ArbeidIPeriodeType.arbeiderProsentAvNormalt,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                prosentAvNormalt: 15,
            };
            const { timerEllerProsent, prosentAvNormalt, arbeiderIPerioden } =
                mapArbeidIPeriodeApiDataProsentToFormValues(arbeid);
            expect(arbeiderIPerioden).toEqual(ArbeiderIPeriodenSvar.redusert);
            expect(timerEllerProsent).toEqual(TimerEllerProsent.PROSENT);
            expect(prosentAvNormalt).toEqual('15');
        });
    });
});
