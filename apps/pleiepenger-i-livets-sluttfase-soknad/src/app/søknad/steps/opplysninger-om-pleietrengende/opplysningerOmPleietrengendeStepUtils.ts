import { OpplysningerOmPleietrengendeSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OpplysningerOmPleietrengendeFormValues } from './OpplysningerOmPleietrengendeStep';

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
) => {
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
                    harIkkeFnr: false,
                    pleietrengendeId: [],
                };
            case 'pleietrengendeUtenFnr':
                return {
                    navn: opplysningerOmPleietrengende.navn,
                    harIkkeFnr: true,
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
    const { navn, norskIdentitetsnummer, harIkkeFnr, fødselsdato, årsakManglerIdentitetsnummer, pleietrengendeId } =
        formValues;

    if (harIkkeFnr && fødselsdato && årsakManglerIdentitetsnummer) {
        return {
            type: 'pleietrengendeUtenFnr',
            navn,
            fødselsdato,
            årsakManglerIdentitetsnummer,
            pleietrengendeId,
        };
    } else if (norskIdentitetsnummer) {
        return {
            type: 'pleietrengendeMedFnr',
            navn,
            norskIdentitetsnummer,
        };
    } else undefined;
};
