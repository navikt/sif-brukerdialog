import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Søknadsdata } from 'app/types/søknadsdata/Søknadsdata';
import { AnnenForeldrenSituasjon } from '../../../types/AnnenForeldrenSituasjon';
import { AnnenForelderenSituasjonSøknadsdata } from '../../../types/søknadsdata/AnnenForelderenSituasjonSøknadsdata';
import { AnnenForelderenSituasjonFormValues } from './AnnenForelderenSituasjonStep';

export const getAnnenForelderenSituasjonStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: AnnenForelderenSituasjonFormValues
): AnnenForelderenSituasjonFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: AnnenForelderenSituasjonFormValues = {
        annenForelderSituasjon: undefined,
        annenForelderSituasjonBeskrivelse: undefined,
        annenForelderPeriodeFom: '',
        annenForelderPeriodeTom: '',
        annenForelderPeriodeVetIkkeTom: undefined,
        annenForelderPeriodeMer6Maneder: YesOrNo.UNANSWERED,
    };

    const { annenForelderenSituasjonData } = søknadsdata;
    if (annenForelderenSituasjonData) {
        switch (annenForelderenSituasjonData.type) {
            case 'sykdomAnnetFom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderenSituasjonData.annenForelderSituasjon,
                    annenForelderSituasjonBeskrivelse: annenForelderenSituasjonData.annenForelderSituasjonBeskrivelse,
                    annenForelderPeriodeFom: annenForelderenSituasjonData.annenForelderPeriodeFom,
                    annenForelderPeriodeVetIkkeTom: annenForelderenSituasjonData.annenForelderPeriodeVetIkkeTom,
                    annenForelderPeriodeMer6Maneder: annenForelderenSituasjonData.annenForelderPeriodeMer6Maneder,
                };
            case 'sykdomAnnetFomTom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderenSituasjonData.annenForelderSituasjon,
                    annenForelderSituasjonBeskrivelse: annenForelderenSituasjonData.annenForelderSituasjonBeskrivelse,
                    annenForelderPeriodeFom: annenForelderenSituasjonData.annenForelderPeriodeFom,
                    annenForelderPeriodeTom: annenForelderenSituasjonData.annenForelderPeriodeTom,
                };
            case 'fengselVerneplikt':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderenSituasjonData.annenForelderSituasjon,
                    annenForelderPeriodeFom: annenForelderenSituasjonData.annenForelderPeriodeFom,
                    annenForelderPeriodeTom: annenForelderenSituasjonData.annenForelderPeriodeTom,
                };
            case 'helseinstitusjonFomTom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderenSituasjonData.annenForelderSituasjon,
                    annenForelderPeriodeFom: annenForelderenSituasjonData.annenForelderPeriodeFom,
                    annenForelderPeriodeTom: annenForelderenSituasjonData.annenForelderPeriodeTom,
                };
            case 'helseinstitusjonFom':
                return {
                    ...defaultValues,
                    annenForelderSituasjon: annenForelderenSituasjonData.annenForelderSituasjon,
                    annenForelderPeriodeFom: annenForelderenSituasjonData.annenForelderPeriodeFom,
                    annenForelderPeriodeVetIkkeTom: annenForelderenSituasjonData.annenForelderPeriodeVetIkkeTom,
                    annenForelderPeriodeMer6Maneder: annenForelderenSituasjonData.annenForelderPeriodeMer6Maneder,
                };
        }
    }
    return defaultValues;
};

export const getAnnenForelderenSituasjonFromFormValues = (
    values: AnnenForelderenSituasjonFormValues
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
        return undefined;
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
        return undefined;
    }

    return undefined;
};
