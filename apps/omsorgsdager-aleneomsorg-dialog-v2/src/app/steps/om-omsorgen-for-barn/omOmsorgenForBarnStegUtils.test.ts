import type { RegistrertBarn } from '@sif/api/k9-brukerdialog-prosessering';
import { YesOrNo } from '@sif/rhf';
import type { AnnetBarn } from '@sif/soknad-forms';
import type { ISODate } from '@sif/utils';
import { describe, expect, it } from 'vitest';

import {
    fjernValgForUkjenteBarn,
    toOmOmsorgenForBarnFormValues,
    toOmOmsorgenForBarnSøknadsdata,
} from './omOmsorgenForBarnStegUtils';

const annetBarn = [{ fnr: '12345678901', navn: 'Testbarn', fødselsdato: '2017-05-23' as ISODate }] as AnnetBarn[];
const registrertBarn = [{ aktørId: 'aktør-1' }] as RegistrertBarn[];

describe('om aleneomsorg for barn', () => {
    it('gjenoppretter skjemaverdier fra lagrede søknadsdata med nei på delt bosted', () => {
        expect(toOmOmsorgenForBarnFormValues({ annetBarn, harAleneomsorgFor: ['12345678901'] })).toEqual({
            annetBarn,
            harAleneomsorgFor: ['12345678901'],
            avtaleOmDeltBosted: YesOrNo.NO,
        });
    });

    it('lager søknadsdata når søker har aleneomsorg og svarer nei på delt bosted', () => {
        expect(
            toOmOmsorgenForBarnSøknadsdata({
                annetBarn,
                harAleneomsorgFor: ['12345678901'],
                avtaleOmDeltBosted: YesOrNo.NO,
            }),
        ).toEqual({ annetBarn, harAleneomsorgFor: ['12345678901'] });
    });

    it('lager ikke søknadsdata uten valgte barn eller når søker har avtale om delt bosted', () => {
        expect(
            toOmOmsorgenForBarnSøknadsdata({ annetBarn, harAleneomsorgFor: [], avtaleOmDeltBosted: YesOrNo.NO }),
        ).toBeUndefined();
        expect(
            toOmOmsorgenForBarnSøknadsdata({
                annetBarn,
                harAleneomsorgFor: ['12345678901'],
                avtaleOmDeltBosted: YesOrNo.YES,
            }),
        ).toBeUndefined();
    });

    it('fjerner valg for barn som ikke lenger finnes', () => {
        expect(fjernValgForUkjenteBarn(['aktør-1', '12345678901', 'slettet'], [...registrertBarn, ...annetBarn])).toEqual(
            ['aktør-1', '12345678901'],
        );
    });
});
