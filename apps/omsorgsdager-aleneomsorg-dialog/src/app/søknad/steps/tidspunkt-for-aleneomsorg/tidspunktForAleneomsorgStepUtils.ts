import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { Søknadsdata, TidspunktForAleneomsorgSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { TidspunktForAleneomsorgFormValues } from './TidspunktForAleneomsorgStep';

export interface BarnMedAleneomsorg {
    idFnr: string;
    navn: string;
}

export const getTidspunktForAleneomsorgStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: TidspunktForAleneomsorgFormValues
): TidspunktForAleneomsorgFormValues => {
    if (formValues) {
        return formValues;
    }
    const defaultValues: TidspunktForAleneomsorgFormValues = {
        aleneomsorgTidspunkt: [],
    };
    const { tidspunktForAleneomsorgData } = søknadsdata;

    return tidspunktForAleneomsorgData?.aleneomsorgTidspunkt
        ? { aleneomsorgTidspunkt: tidspunktForAleneomsorgData?.aleneomsorgTidspunkt }
        : defaultValues;
};

export const getTidspunktForAleneomsorgSøknadsdataFromFormValues = (
    values: TidspunktForAleneomsorgFormValues
): TidspunktForAleneomsorgSøknadsdata | undefined => {
    const { aleneomsorgTidspunkt = [] } = values;

    if (aleneomsorgTidspunkt.length === 0) {
        return undefined;
    }

    return { aleneomsorgTidspunkt };
};

export const mapRegistrertBarnToBarnMedAleneomsorg = (registrertBarn: RegistrertBarn): BarnMedAleneomsorg => {
    return {
        idFnr: registrertBarn.aktørId,
        navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
    };
};

export const mapAnnetBarnToBarnMedAleneomsorg = (annetBarn: AnnetBarn): BarnMedAleneomsorg => {
    return {
        idFnr: annetBarn.fnr,
        navn: annetBarn.navn,
    };
};
export const getYear = (yearsToSubtract: number): string => (dayjs().year() - yearsToSubtract).toString();

export const getMinDateYearAgo = (): Date => {
    dayjs.extend(dayOfYear);
    return dayjs().subtract(1, 'year').dayOfYear(1).toDate();
};
