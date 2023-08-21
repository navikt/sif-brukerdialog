import { guid } from '@navikt/sif-common-utils';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.START_SØKNAD:
            return {
                ...state,
                søknadsdata: {
                    id: guid(),
                    velkommen: {
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                søknadRoute: SøknadRoutes.OPPLYSNINGER_OM_PLEIETRENGENDE,
                børMellomlagres: true,
            };
        case SøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknadsdata: {},
                søknadRoute: SøknadRoutes.VELKOMMEN,
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

            case SøknadContextActionKeys.SET_SØKNAD_OPPLYSNINGER_OM_PLEIETRENGENDE:
                const søknadsdata: Søknadsdata = {
                    ...state.søknadsdata,
                    opplysningerOmPleietrengende: {
                        ...action.payload,
                    },
                };

                return {
                    ...state,
                    søknadsdata,
                };

            case SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        legeerklæring: {
                            ...action.payload,
                        },
                    },
                };
            case SøknadContextActionKeys.SET_SØKNAD_TIDSROM:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        tidsrom: {
                            ...action.payload,
                        },
                    },
                };
            case SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON:
                console.log('action: ', action);
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        arbeidssituasjon: {
                            ...action.payload,
                        },
                    },
                };

            case SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        arbeidstid: {
                            ...action.payload,
                        },
                    },
                };

            case SøknadContextActionKeys.SET_SØKNAD_MEDLEMSKAP:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        medlemskap: {
                            ...action.payload,
                        },
                    },
                };

            case SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        oppsummering: {
                            harBekreftetOpplysninger: action.payload.harBekreftetOpplysninger,
                        },
                    },
                };
            case SøknadContextActionKeys.SET_SØKNAD_SENDT:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: {},
                    søknadSendt: true,
                };
            case SøknadContextActionKeys.RESET_SØKNAD:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: {},
                    søknadSendt: false,
                    søknadRoute: SøknadRoutes.VELKOMMEN,
                };
            default:
                // eslint-disable-next-line no-console
                console.error(`Missing handler for ${action.type}`);
        }
    }
    return state;
};
