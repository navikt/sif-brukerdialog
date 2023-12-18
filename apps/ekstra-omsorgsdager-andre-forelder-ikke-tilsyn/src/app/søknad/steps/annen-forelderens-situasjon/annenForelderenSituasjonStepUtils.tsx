import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { AnnenForeldrenSituasjon } from '../../../types/AnnenForeldrenSituasjon';
import { AnnenForelderenSituasjonSøknadsdata } from '../../../types/søknadsdata/AnnenForelderenSituasjonSøknadsdata';
import { AnnenForelderenSituasjonFormValues } from './AnnenForelderenSituasjonStep';
import dayjs from 'dayjs';

export const getAnnenForelderenSituasjonStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: AnnenForelderenSituasjonFormValues,
): AnnenForelderenSituasjonFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: AnnenForelderenSituasjonFormValues = {
        annenForelderSituasjon: undefined,
        annenForelderSituasjonBeskrivelse: undefined,
        annenForelderPeriodeFom: '',
        annenForelderPeriodeTom: '',
        annenForelderPeriodeVetIkkeTom: false,
        annenForelderPeriodeMer6Maneder: YesOrNo.UNANSWERED,
    };

    const { annenForelderSituasjon } = søknadsdata;
    if (annenForelderSituasjon) {
        switch (annenForelderSituasjon.type) {
            case 'sykdomAnnetFom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderSituasjon.annenForelderSituasjon,
                    annenForelderSituasjonBeskrivelse: annenForelderSituasjon.annenForelderSituasjonBeskrivelse,
                    annenForelderPeriodeFom: annenForelderSituasjon.annenForelderPeriodeFom,
                    annenForelderPeriodeVetIkkeTom: annenForelderSituasjon.annenForelderPeriodeVetIkkeTom,
                    annenForelderPeriodeMer6Maneder: annenForelderSituasjon.annenForelderPeriodeMer6Maneder,
                };
            case 'sykdomAnnetFomTom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderSituasjon.annenForelderSituasjon,
                    annenForelderSituasjonBeskrivelse: annenForelderSituasjon.annenForelderSituasjonBeskrivelse,
                    annenForelderPeriodeFom: annenForelderSituasjon.annenForelderPeriodeFom,
                    annenForelderPeriodeTom: annenForelderSituasjon.annenForelderPeriodeTom,
                };
            case 'fengselVerneplikt':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderSituasjon.annenForelderSituasjon,
                    annenForelderPeriodeFom: annenForelderSituasjon.annenForelderPeriodeFom,
                    annenForelderPeriodeTom: annenForelderSituasjon.annenForelderPeriodeTom,
                };
            case 'helseinstitusjonFomTom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderSituasjon.annenForelderSituasjon,
                    annenForelderPeriodeFom: annenForelderSituasjon.annenForelderPeriodeFom,
                    annenForelderPeriodeTom: annenForelderSituasjon.annenForelderPeriodeTom,
                };
            case 'helseinstitusjonFom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderSituasjon.annenForelderSituasjon,
                    annenForelderPeriodeFom: annenForelderSituasjon.annenForelderPeriodeFom,
                    annenForelderPeriodeVetIkkeTom: annenForelderSituasjon.annenForelderPeriodeVetIkkeTom,
                    annenForelderPeriodeMer6Maneder: annenForelderSituasjon.annenForelderPeriodeMer6Maneder,
                };
        }
    }
    return defaultValues;
};

export const getAnnenForelderenSituasjonSøknadsdataFromFormValues = (
    values: AnnenForelderenSituasjonFormValues,
): AnnenForelderenSituasjonSøknadsdata | undefined => {
    const {
        annenForelderSituasjon,
        annenForelderPeriodeFom,
        annenForelderPeriodeTom,
        annenForelderSituasjonBeskrivelse,
        annenForelderPeriodeVetIkkeTom,
        annenForelderPeriodeMer6Maneder,
    } = values;

    if (annenForelderSituasjon === undefined && annenForelderPeriodeFom === undefined) {
        return undefined;
    }
    if (
        (annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
            annenForelderSituasjon === AnnenForeldrenSituasjon.annet) &&
        annenForelderSituasjonBeskrivelse !== undefined
    ) {
        if (annenForelderPeriodeVetIkkeTom === true && annenForelderPeriodeMer6Maneder !== undefined) {
            return {
                type: 'sykdomAnnetFom',
                annenForelderSituasjon,
                annenForelderPeriodeFom,
                annenForelderSituasjonBeskrivelse,
                annenForelderPeriodeVetIkkeTom: true,
                annenForelderPeriodeMer6Maneder,
            };
        }
        if (annenForelderPeriodeVetIkkeTom === false && annenForelderPeriodeTom !== undefined) {
            return {
                type: 'sykdomAnnetFomTom',
                annenForelderSituasjon,
                annenForelderPeriodeFom,
                annenForelderPeriodeTom,
                annenForelderSituasjonBeskrivelse,
                annenForelderPeriodeVetIkkeTom: false,
            };
        }
    }

    if (
        (annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel ||
            annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt) &&
        annenForelderPeriodeTom !== undefined
    ) {
        return {
            type: 'fengselVerneplikt',
            annenForelderSituasjon,
            annenForelderPeriodeFom,
            annenForelderPeriodeTom,
        };
    }

    if (annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon) {
        if (annenForelderPeriodeVetIkkeTom === false && annenForelderPeriodeTom !== undefined) {
            return {
                type: 'helseinstitusjonFomTom',
                annenForelderSituasjon,
                annenForelderPeriodeFom,
                annenForelderPeriodeTom,
                annenForelderPeriodeVetIkkeTom: false,
            };
        }
        if (annenForelderPeriodeVetIkkeTom === true && annenForelderPeriodeMer6Maneder !== undefined) {
            return {
                type: 'helseinstitusjonFom',
                annenForelderSituasjon,
                annenForelderPeriodeFom,
                annenForelderPeriodeVetIkkeTom: true,
                annenForelderPeriodeMer6Maneder,
            };
        }
    }

    return undefined;
};

export const isPeriodeLess6month = (periodeFom: string, periodeTom: string): boolean => {
    return dayjs(periodeTom).add(1, 'day').diff(periodeFom, 'month', true) < 6;
};
