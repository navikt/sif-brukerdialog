import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.SET_FORSTÅR_RETTIGHETER_OG_PLIKTER:
            return {
                ...state,
                søknadFormValues: {
                    ...state.søknadFormValues,
                    harForståttRettigheterOgPlikter: true,
                },
            };
        case SøknadContextActionKeys.SET_FORM_VALUES:
            return {
                ...state,
                søknadFormValues: {
                    ...action.payload,
                },
            };
        case SøknadContextActionKeys.SET_SØKNAD_BARN:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    barn: {
                        ...action.payload,
                        fødselsdato: ISODateToDate(action.payload.fødselsdato),
                    },
                },
            };
    }
    return { ...state };
};
