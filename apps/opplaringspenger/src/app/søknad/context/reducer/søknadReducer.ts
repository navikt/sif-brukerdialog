import { guid, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.START_SØKNAD:
            return {
                ...state,
                søknadsdata: {
                    id: guid(),
                    harForståttRettigheterOgPlikter: true,
                },
                søknadRoute: SøknadRoutes.BARN,
                børMellomlagres: true,
            };
        case SøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknadsdata: {},
                søknadRoute: undefined,
            };
    }

    if (state.søknadsdata) {
        switch (action.type) {
            case SøknadContextActionKeys.SET_SØKNAD_ROUTE:
                return {
                    ...state,
                    søknadRoute: action.payload,
                };
            case SøknadContextActionKeys.REQUEST_LAGRE_SØKNAD:
                return {
                    ...state,
                    børMellomlagres: true,
                };
            case SøknadContextActionKeys.SET_SØKNAD_LAGRET:
                return {
                    ...state,
                    børMellomlagres: false,
                };
            case SøknadContextActionKeys.SET_SØKNAD_BARN:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
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
