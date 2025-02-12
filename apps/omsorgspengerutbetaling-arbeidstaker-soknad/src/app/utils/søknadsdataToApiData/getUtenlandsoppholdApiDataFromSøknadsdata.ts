import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { UtenlandsoppholdApiData } from '../../types/søknadApiData/SøknadApiData';
import { FraværSøknadsdata } from '../../types/søknadsdata/FraværSøknadsdata';
import { mapBostedUtlandToApiData } from './getMedlemskapApiDataFromSøknadsdata';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

export const getUtenlansoppholdApiDataFromSøknadsdata = (
    locale: string,
    fraværSøknadsdata?: FraværSøknadsdata,
): UtenlandsoppholdApiData[] => {
    if (fraværSøknadsdata === undefined) {
        throw Error('fraværSøknadsdata i getUtenlansoppholdApiDataFromSøknadsdata undefined');
    }
    const { perioderHarVærtIUtlandet, perioderUtenlandsopphold } = fraværSøknadsdata;

    const harVærtIUtlandet = perioderHarVærtIUtlandet === YesOrNo.YES;

    if (harVærtIUtlandet === true && perioderUtenlandsopphold.length === 0) {
        throw Error('perioder_utenlandsopphold i getUtenlansoppholdApiDataFromSøknadsdata tomt');
    }

    return harVærtIUtlandet === true
        ? perioderUtenlandsopphold.map((utenlandsopphold: Utenlandsopphold) => {
              return mapBostedUtlandToApiData(utenlandsopphold, locale);
          })
        : [];
};
