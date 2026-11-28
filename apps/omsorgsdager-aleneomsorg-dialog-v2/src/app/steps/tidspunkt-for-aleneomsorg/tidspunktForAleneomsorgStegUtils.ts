import type { TidspunktForAleneomsorgSøknadsdata } from '@app/types/Soknadsdata';
import { getDagensDatoIOslo, type ISODate } from '@sif/utils';

import {
    type AleneomsorgTidspunkt,
    type BarnMedAleneomsorg,
    TidspunktForAleneomsorg,
    type TidspunktForAleneomsorgFormValues,
} from './types';

export const prefixBarnId = (id: string): string => `idFnr_${id}`;

export const unprefixBarnId = (id: string): string => id.replace(/^idFnr_/, '');

export const getÅr = (årTilbake: number): string => {
    const inneværendeÅr = Number(getDagensDatoIOslo().slice(0, 4));
    return String(inneværendeÅr - årTilbake);
};

export const getMinDatoForTidspunkt = (): ISODate => `${getÅr(1)}-01-01` as ISODate;

const beholdValgteBarn = (
    tidspunkter: Record<string, AleneomsorgTidspunkt>,
    barnMedAleneomsorg: BarnMedAleneomsorg[],
): Record<string, AleneomsorgTidspunkt> =>
    Object.fromEntries(
        barnMedAleneomsorg.map(({ id }) => [
            prefixBarnId(id),
            tidspunkter[prefixBarnId(id)] ? { ...tidspunkter[prefixBarnId(id)] } : {},
        ]),
    );

export const toTidspunktForAleneomsorgFormValues = (
    søknadsdata: TidspunktForAleneomsorgSøknadsdata | undefined,
    barnMedAleneomsorg: BarnMedAleneomsorg[],
    draftFormValues?: Partial<TidspunktForAleneomsorgFormValues>,
): TidspunktForAleneomsorgFormValues => ({
    aleneomsorgTidspunkt: beholdValgteBarn(
        draftFormValues?.aleneomsorgTidspunkt ?? søknadsdata?.aleneomsorgTidspunkt ?? {},
        barnMedAleneomsorg,
    ),
});

export const toTidspunktForAleneomsorgSøknadsdata = (
    values: TidspunktForAleneomsorgFormValues,
    barnMedAleneomsorg?: BarnMedAleneomsorg[],
): TidspunktForAleneomsorgSøknadsdata | undefined => {
    const keys = barnMedAleneomsorg
        ? barnMedAleneomsorg.map(({ id }) => prefixBarnId(id))
        : Object.keys(values.aleneomsorgTidspunkt);
    const aleneomsorgTidspunkt: Record<string, AleneomsorgTidspunkt> = {};
    for (const key of keys) {
        const tidspunkt = values.aleneomsorgTidspunkt[key];
        if (!tidspunkt?.tidspunktForAleneomsorg) {
            return undefined;
        }
        if (
            tidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE &&
            !tidspunkt.dato
        ) {
            return undefined;
        }
        aleneomsorgTidspunkt[key] =
            tidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                ? { tidspunktForAleneomsorg: tidspunkt.tidspunktForAleneomsorg, dato: tidspunkt.dato }
                : { tidspunktForAleneomsorg: tidspunkt.tidspunktForAleneomsorg };
    }

    return keys.length > 0 ? { aleneomsorgTidspunkt } : undefined;
};
