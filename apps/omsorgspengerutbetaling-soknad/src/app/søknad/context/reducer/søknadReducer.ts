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
                søknadRoute: SøknadRoutes.DINE_BARN,
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
            case SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_DATA:
                return {
                    ...state,
                    tempFormData: action.payload,
                };
            case SøknadContextActionKeys.SET_SØKNAD_DINE_BARN: {
                const søknadsdata: Søknadsdata = {
                    ...state.søknadsdata,
                    dineBarn: {
                        ...action.payload,
                    },
                };

                return {
                    ...state,
                    søknadsdata,
                };
            }
            case SøknadContextActionKeys.SET_SØKNAD_FRAVÆR:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        fravaer: {
                            ...action.payload,
                        },
                    },
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
            case SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        arbeidssituasjon: {
                            ...action.payload,
                        },
                    },
                };

            case SøknadContextActionKeys.SET_SØKNAD_FRAVÆR_FRA:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        //TODO SLETTE HVIS KUN Frilans eller SN
                        fravaerFra: {
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
            case SøknadContextActionKeys.SET_IS_RELOADING_APP:
                return {
                    ...state,
                    isReloadingApp: true,
                };
            default:
                // eslint-disable-next-line no-console
                console.error(`Missing handler for ${action.type}`);
        }
    }
    return state;
};
