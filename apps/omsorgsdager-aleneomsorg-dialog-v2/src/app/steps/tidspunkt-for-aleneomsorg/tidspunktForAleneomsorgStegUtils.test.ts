import type { ISODate } from '@sif/utils';
import { describe, expect, it } from 'vitest';

import {
    prefixBarnId,
    toTidspunktForAleneomsorgFormValues,
    toTidspunktForAleneomsorgSøknadsdata,
} from './tidspunktForAleneomsorgStegUtils';
import { TidspunktForAleneomsorg, type TidspunktForAleneomsorgFormValues } from './types';

const barn = [{ id: '123', navn: 'Test Barn' }];
const dato = '2026-05-12' as ISODate;

describe('tidspunkt for aleneomsorg', () => {
    it('beholder bare skjemaverdier for barn som fortsatt er valgt', () => {
        const draft: TidspunktForAleneomsorgFormValues = {
            aleneomsorgTidspunkt: {
                [prefixBarnId('123')]: { tidspunktForAleneomsorg: TidspunktForAleneomsorg.TIDLIGERE },
                [prefixBarnId('slettet')]: { tidspunktForAleneomsorg: TidspunktForAleneomsorg.TIDLIGERE },
            },
        };

        expect(toTidspunktForAleneomsorgFormValues(undefined, barn, draft)).toEqual({
            aleneomsorgTidspunkt: {
                [prefixBarnId('123')]: { tidspunktForAleneomsorg: TidspunktForAleneomsorg.TIDLIGERE },
            },
        });
    });

    it('fjerner dato når aleneomsorgen startet før de siste to årene', () => {
        expect(
            toTidspunktForAleneomsorgSøknadsdata(
                {
                    aleneomsorgTidspunkt: {
                        [prefixBarnId('123')]: {
                            tidspunktForAleneomsorg: TidspunktForAleneomsorg.TIDLIGERE,
                            dato,
                        },
                    },
                },
                barn,
            ),
        ).toEqual({
            aleneomsorgTidspunkt: {
                [prefixBarnId('123')]: { tidspunktForAleneomsorg: TidspunktForAleneomsorg.TIDLIGERE },
            },
        });
    });

    it('krever dato de siste to årene', () => {
        expect(
            toTidspunktForAleneomsorgSøknadsdata(
                {
                    aleneomsorgTidspunkt: {
                        [prefixBarnId('123')]: {
                            tidspunktForAleneomsorg: TidspunktForAleneomsorg.SISTE_2_ÅRENE,
                        },
                    },
                },
                barn,
            ),
        ).toBeUndefined();
    });
});
