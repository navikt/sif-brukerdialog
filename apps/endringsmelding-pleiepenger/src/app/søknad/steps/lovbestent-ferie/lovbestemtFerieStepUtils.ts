import { dateRangeToISODateRange, sortDateRange } from '@navikt/sif-common-utils/lib';
import { LovbestemtFeriePeriode } from '../../../types/Sak';
import { Søknadsdata, LovbestemtFerieSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
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
        perioder: søknadsdata.lovbestemtFerie.perioderMedFerie.map((periode) => ({
            id: dateRangeToISODateRange(periode),
            fom: periode.from,
            tom: periode.to,
        })),
    };
};

export const getLovbestemtFerieSøknadsdataFromFormValues = (
    values: LovbestemtFerieFormValues,
    lovbestemtFerieISak: LovbestemtFeriePeriode[]
): LovbestemtFerieSøknadsdata => {
    const perioderMedFerie = values[LovbestemtFerieFormFields.perioder]
        .map((periode): LovbestemtFeriePeriode => ({ from: periode.fom, to: periode.tom, skalHaFerie: true }))
        .sort(sortDateRange);

    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieEndringer(
        values[LovbestemtFerieFormFields.perioder].map((periode) => {
            return {
                from: periode.fom,
                to: periode.tom,
                skalHaFerie: true,
            };
        }),
        lovbestemtFerieISak
    );
    return {
        perioderMedFerie,
        perioderFjernet,
        perioderLagtTil,
    };
};
