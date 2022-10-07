import { guid, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadStegID } from '../../søknadStepsConfig';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.START_SØKNAD:
            return {
                ...state,
                søknad: {
                    id: guid(),
                    harForståttRettigheterOgPlikter: true,
                },
                steg: SøknadStegID.BARN,
            };
        case SøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknad: undefined,
                steg: undefined,
            };
    }
    if (state.søknad) {
        switch (action.type) {
            case SøknadContextActionKeys.SET_SØKNAD_STEG:
                return {
                    ...state,
                    steg: action.payload,
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
    }
    return state;
};
