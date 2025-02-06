import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { Søknadsdata, TidspunktForAleneomsorgSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import {
    AleneomsorgTidspunkt,
    TidspunktForAleneomsorg,
    TidspunktForAleneomsorgFormValues,
} from './TidspunktForAleneomsorgStep';

export interface BarnMedAleneomsorg {
    idFnr: string;
    navn: string;
}

export const getTidspunktForAleneomsorgStepInitialValues = (
    søknadsdata: Søknadsdata,
    barnMedAleneomsorg: BarnMedAleneomsorg[],
    formValues?: TidspunktForAleneomsorgFormValues,
): TidspunktForAleneomsorgFormValues => {
    if (formValues) {
        Object.keys(formValues.aleneomsorgTidspunkt).map((key) => {
            if (barnMedAleneomsorg.find((barn) => barn.idFnr === key) === undefined) {
                delete formValues.aleneomsorgTidspunkt[key];
            }
        });

        return formValues;
    }

    const defaultValues = {} as AleneomsorgTidspunkt;

    const { tidspunktForAleneomsorg } = søknadsdata;

    return tidspunktForAleneomsorg?.aleneomsorgTidspunkt
        ? tidspunktForAleneomsorg
        : { aleneomsorgTidspunkt: defaultValues };
};

export const getTidspunktForAleneomsorgSøknadsdataFromFormValues = (
    values?: TidspunktForAleneomsorgFormValues,
): TidspunktForAleneomsorgSøknadsdata | undefined => {
    if (!values || !values.aleneomsorgTidspunkt) {
        return undefined;
    }
    Object.keys(values.aleneomsorgTidspunkt).map((key) => {
        if (values.aleneomsorgTidspunkt[key].tidspunktForAleneomsorg === TidspunktForAleneomsorg.TIDLIGERE) {
            delete values.aleneomsorgTidspunkt[key].dato;
        }
    });
    return { aleneomsorgTidspunkt: values.aleneomsorgTidspunkt };
};

export const mapRegistrertBarnToBarnMedAleneomsorg = (registrertBarn: RegistrertBarn): BarnMedAleneomsorg => {
    return {
        idFnr: prefixBarnIdFnr(registrertBarn.aktørId),
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
    };
};

export const mapAnnetBarnToBarnMedAleneomsorg = (annetBarn: AnnetBarn): BarnMedAleneomsorg => {
    return {
        idFnr: prefixBarnIdFnr(annetBarn.fnr),
        navn: annetBarn.navn,
    };
};
export const getYear = (yearsToSubtract: number): string => (dayjs().year() - yearsToSubtract).toString();

/**
 *
 * @param idFnr Legger på 'idFnr_' før nummer, slik at en unngår at formik bruker fnr eller id som index i errorArray
 * @returns
 */
export const prefixBarnIdFnr = (idFnr: string): string => `idFnr_${idFnr}`;
/**
 *
 * @param idFnr Fjerner på 'idFnr_' for å bruke originalt fnr eller id
 * @returns
 */
export const unprefixBarnIdFnr = (prefixedIdFnr: string): string => prefixedIdFnr.replace('idFnr_', '');

export const getMinDateYearAgo = (): Date => {
    dayjs.extend(dayOfYear);
    return dayjs().subtract(1, 'year').dayOfYear(1).toDate();
};
