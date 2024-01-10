import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { UtenlandsoppholdApiData } from '../../types/søknadApiData/SøknadApiData';
import { FraværSøknadsdata } from '../../types/søknadsdata/FraværSøknadsdata';
import { mapBostedUtlandToApiData } from './getMedlemskapApiDataFromSøknadsdata';

export const getUtenlansoppholdApiDataFromSøknadsdata = (
    locale: string,
    fraværSøknadsdata?: FraværSøknadsdata,
): UtenlandsoppholdApiData[] => {
    if (fraværSøknadsdata === undefined) {
        throw Error('fraværSøknadsdata i getUtenlansoppholdApiDataFromSøknadsdata undefined');
    }
    const { perioder_harVærtIUtlandet, perioder_utenlandsopphold } = fraværSøknadsdata;

    if (perioder_harVærtIUtlandet === true && perioder_utenlandsopphold.length === 0) {
        throw Error('perioder_utenlandsopphold i getUtenlansoppholdApiDataFromSøknadsdata tomt');
    }

    return perioder_harVærtIUtlandet === true
        ? perioder_utenlandsopphold.map((utenlandsopphold: Utenlandsopphold) => {
              return mapBostedUtlandToApiData(utenlandsopphold, locale);
          })
        : [];
};
