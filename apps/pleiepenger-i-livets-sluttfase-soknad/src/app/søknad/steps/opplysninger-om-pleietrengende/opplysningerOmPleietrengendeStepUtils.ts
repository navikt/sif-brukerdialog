import { OpplysningerOmPleietrengendeSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OpplysningerOmPleietrengendeFormValues } from './OpplysningerOmPleietrengendeForm';

export const opplysningerOmPleietrengendeDefaultValues: OpplysningerOmPleietrengendeFormValues = {
    navn: '',
    norskIdentitetsnummer: '',
    harIkkeFnr: false,
    fødselsdato: undefined,
    pleietrengendeId: [],
};

export const getOpplysningerOmPleietrengendeStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OpplysningerOmPleietrengendeFormValues,
): OpplysningerOmPleietrengendeFormValues => {
    if (formValues) {
        return formValues;
    }

    const { opplysningerOmPleietrengende } = søknadsdata;

    if (opplysningerOmPleietrengende) {
        switch (opplysningerOmPleietrengende.type) {
            case 'pleietrengendeMedFnr':
                return {
                    navn: opplysningerOmPleietrengende.navn,
                    norskIdentitetsnummer: opplysningerOmPleietrengende.norskIdentitetsnummer,
                    flereSokere: opplysningerOmPleietrengende.flereSokere,
                    harIkkeFnr: false,
                    pleietrengendeId: [],
                };
            case 'pleietrengendeUtenFnr':
                return {
                    navn: opplysningerOmPleietrengende.navn,
                    harIkkeFnr: true,
                    flereSokere: opplysningerOmPleietrengende.flereSokere,
                    fødselsdato: opplysningerOmPleietrengende.fødselsdato,
                    årsakManglerIdentitetsnummer: opplysningerOmPleietrengende.årsakManglerIdentitetsnummer,
                    pleietrengendeId: opplysningerOmPleietrengende.pleietrengendeId,
                };
        }
    }

    return opplysningerOmPleietrengendeDefaultValues;
};

export const getOpplysningerOmPleietrengendeSøknadsdataFromFormValues = (
    formValues: OpplysningerOmPleietrengendeFormValues,
): OpplysningerOmPleietrengendeSøknadsdata | undefined => {
    const {
        navn,
        norskIdentitetsnummer,
        harIkkeFnr,
        flereSokere,
        fødselsdato,
        årsakManglerIdentitetsnummer,
        pleietrengendeId,
    } = formValues;

    if (harIkkeFnr && fødselsdato && årsakManglerIdentitetsnummer && flereSokere) {
        return {
            type: 'pleietrengendeUtenFnr',
            navn,
            fødselsdato,
            flereSokere,
            årsakManglerIdentitetsnummer,
            pleietrengendeId,
        };
    } else if (norskIdentitetsnummer && flereSokere) {
        return {
            type: 'pleietrengendeMedFnr',
            navn,
            flereSokere,
            norskIdentitetsnummer,
        };
    } else {
        return undefined;
    }
};
