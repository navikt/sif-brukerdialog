import type { RegistrertBarn, Søker } from '@sif/api/k9-brukerdialog-prosessering';
import type { AnnetBarn } from '@sif/soknad-forms';
import type { ISODate } from '@sif/utils';
import { describe, expect, it } from 'vitest';

import { prefixBarnId } from '../steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgStegUtils';
import { TidspunktForAleneomsorg } from '../steps/tidspunkt-for-aleneomsorg/types';
import type { Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';
import { soknadsdataToSoknadDTO } from './soknadsdataToSoknadDTO';

const søker = { fødselsnummer: '12345678901' } as Søker;
const registrerteBarn = [
    {
        aktørId: 'aktør-1',
        fornavn: 'Registrert',
        etternavn: 'Barn',
        fødselsdato: '2017-01-01',
    },
] as RegistrertBarn[];
const annetBarn = [
    {
        fnr: '12345678902',
        navn: 'Annet Barn',
        fødselsdato: '2018-02-03' as ISODate,
    },
] as AnnetBarn[];

describe('søknadsdata til DTO', () => {
    it('mapper bare valgte barn med valgt tidspunkt', () => {
        const søknadsdata: Søknadsdata = {
            harForståttRettigheterOgPlikter: true,
            [SøknadStepId.OM_OMSORGEN_FOR_BARN]: {
                annetBarn,
                harAleneomsorgFor: ['12345678902'],
            },
            [SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG]: {
                aleneomsorgTidspunkt: {
                    [prefixBarnId('12345678902')]: {
                        tidspunktForAleneomsorg: TidspunktForAleneomsorg.SISTE_2_ÅRENE,
                        dato: '2026-05-12' as ISODate,
                    },
                },
            },
        };

        expect(soknadsdataToSoknadDTO({ søker, registrerteBarn, søknadsdata, språk: 'nb' })).toMatchObject({
            barn: [
                {
                    navn: 'Annet Barn',
                    identitetsnummer: '12345678902',
                    fødselsdato: '2018-02-03',
                    tidspunktForAleneomsorg: TidspunktForAleneomsorg.SISTE_2_ÅRENE,
                    dato: '2026-05-12',
                    type: 'ANNET',
                },
            ],
        });
    });

    it('kan ikke lage DTO når tidspunkt mangler for valgt barn', () => {
        const søknadsdata: Søknadsdata = {
            [SøknadStepId.OM_OMSORGEN_FOR_BARN]: {
                annetBarn: [],
                harAleneomsorgFor: ['aktør-1'],
            },
            [SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG]: {
                aleneomsorgTidspunkt: {},
            },
        };

        expect(soknadsdataToSoknadDTO({ søker, registrerteBarn, søknadsdata, språk: 'nb' })).toBeUndefined();
    });
});
