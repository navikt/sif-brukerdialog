import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
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
): OpplysningerOmPleietrengendeFormValues => {
    if (formValues) {
        return formValues;
    }

    const { opplysningerOmPleietrengende } = søknadsdata;

    if (opplysningerOmPleietrengende) {
        const pleierDuDenSykeHjemme = opplysningerOmPleietrengende.pleierDuDenSykeHjemme ? YesOrNo.YES : YesOrNo.NO;
        switch (opplysningerOmPleietrengende.type) {
            case 'pleietrengendeMedFnr':
                return {
                    pleierDuDenSykeHjemme,
                    navn: opplysningerOmPleietrengende.navn,
                    norskIdentitetsnummer: opplysningerOmPleietrengende.norskIdentitetsnummer,
                    harIkkeFnr: false,
                    pleietrengendeId: [],
                };
            case 'pleietrengendeUtenFnr':
                return {
                    pleierDuDenSykeHjemme,
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
    const {
        navn,
        norskIdentitetsnummer,
        harIkkeFnr,
        fødselsdato,
        årsakManglerIdentitetsnummer,
        pleietrengendeId,
        pleierDuDenSykeHjemme,
    } = formValues;

    if (harIkkeFnr && fødselsdato && årsakManglerIdentitetsnummer) {
        return {
            type: 'pleietrengendeUtenFnr',
            navn,
            fødselsdato,
            pleierDuDenSykeHjemme: pleierDuDenSykeHjemme === YesOrNo.YES,
            årsakManglerIdentitetsnummer,
            pleietrengendeId,
        };
    } else if (norskIdentitetsnummer) {
        return {
            type: 'pleietrengendeMedFnr',
            navn,
            pleierDuDenSykeHjemme: pleierDuDenSykeHjemme === YesOrNo.YES,
            norskIdentitetsnummer,
        };
    } else {
        return undefined;
    }
};
