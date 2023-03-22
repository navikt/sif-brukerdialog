import { sortDateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { LovbestemtFerieSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { getLovbestemtFerieEndringer } from '../../../utils/lovbestemtFerieUtils';
import { LovbestemtFerieFormFields, LovbestemtFerieFormValues } from './LovbestemtFerieStep';

export const getLovbestemtFerieStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: LovbestemtFerieFormValues
): LovbestemtFerieFormValues => {
    if (formValues) {
        return formValues;
    }
    if (søknadsdata.lovbestemtFerie === undefined) {
        return {
            perioder: [],
        };
    }
    return {
        perioder: [...søknadsdata.lovbestemtFerie.perioderMedFerie],
    };
};

export const getLovbestemtFerieSøknadsdataFromFormValues = (
    values: LovbestemtFerieFormValues,
    lovbestemtFerieISak: LovbestemtFeriePeriode[]
): LovbestemtFerieSøknadsdata => {
    const perioderMedFerie = values[LovbestemtFerieFormFields.perioder]
        .map((periode): LovbestemtFeriePeriode => ({ from: periode.from, to: periode.to, skalHaFerie: true }))
        .sort(sortDateRange);

    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieEndringer(
        values[LovbestemtFerieFormFields.perioder].map((periode) => {
            return {
                from: periode.from,
                to: periode.to,
                skalHaFerie: true,
            };
        }),
        lovbestemtFerieISak
    );
    return {
        perioderMedFerie: perioderMedFerie,
        perioderFjernet,
        perioderLagtTil,
    };
};
