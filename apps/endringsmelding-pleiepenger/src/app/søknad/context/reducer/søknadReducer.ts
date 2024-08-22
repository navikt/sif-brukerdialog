import { guid } from '@navikt/sif-common-utils';
import { EndringType, SøknadContextState, Søknadsdata, ValgteEndringer } from '@types';
import { getFeriedagerMeta } from '@utils';
import { getSøknadStepRoute, SøknadRoutes } from '../../config/SøknadRoutes';
import { getSøknadSteps } from '../../config/søknadStepConfig';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';

const initialSøknadsdata: Søknadsdata = {
    id: undefined,
} as any;

const getValgteEndringer = (endringer: EndringType[]): ValgteEndringer => ({
    arbeidstid: endringer.some((a) => a === EndringType.arbeidstid),
    lovbestemtFerie: endringer.some((a) => a === EndringType.lovbestemtFerie),
});

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.START_SØKNAD: {
            const { sak, valgtHvaSkalEndres } = action.payload;
            const valgteEndringer = getValgteEndringer(valgtHvaSkalEndres);
            const søknadSteps = getSøknadSteps(valgteEndringer, sak.harArbeidsgivereIkkeISak);
            return {
                ...state,
                søknadsdata: {
                    id: guid(),
                    velkommen: {
                        harForståttRettigheterOgPlikter: true,
                    },
                    lovbestemtFerie: {
                        feriedager: sak.lovbestemtFerie.feriedager,
                        feriedagerMeta: getFeriedagerMeta(sak.lovbestemtFerie.feriedager),
                    },
                },
                sak,
                valgteEndringer,
                søknadSteps,
                søknadRoute: getSøknadStepRoute(søknadSteps[0]),
                børMellomlagres: true,
            };
        }
        case SøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknadsdata: initialSøknadsdata,
                søknadRoute: undefined,
                /**
                 * Alle typer legges inn for å unngå at dynamiske steg fjernes når søknadsdata tømmes
                 * Verdien settes på nytt når søker starter ny meldning
                 */
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
            case SøknadContextActionKeys.SET_SØKNAD_UKJENT_ARBEIDSFOHOLD:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        ukjentArbeidsforhold: {
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
            case SøknadContextActionKeys.SET_SØKNAD_LOVBESTEMT_FERIE: {
                const newState: SøknadContextState = {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        lovbestemtFerie: {
                            ...action.payload,
                        },
                    },
                };
                const søknadSteps = getSøknadSteps(
                    state.valgteEndringer,
                    state.sak.harArbeidsgivereIkkeISak,
                    state.søknadsdata,
                );

                return {
                    ...newState,
                    søknadSteps,
                };
            }

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
            case SøknadContextActionKeys.SET_ENDRINGSMELDING_SENDT:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: initialSøknadsdata,
                    valgteEndringer: {
                        arbeidstid: false,
                        lovbestemtFerie: false,
                    },
                    endringsmeldingSendt: true,
                };
            case SøknadContextActionKeys.RESET_SØKNAD:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: initialSøknadsdata,
                    endringsmeldingSendt: false,
                    valgteEndringer: {
                        arbeidstid: false,
                        lovbestemtFerie: false,
                    },
                    søknadRoute: SøknadRoutes.VELKOMMEN,
                };
            case SøknadContextActionKeys.CLEAR_STEP_SØKNADSDATA:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        [action.payload.stepId]: undefined,
                    },
                };
            case SøknadContextActionKeys.SET_SAK:
                return {
                    ...state,
                    sak: action.payload.sak,
                };
            case SøknadContextActionKeys.SET_INPUT_PREFERANSER:
                return {
                    ...state,
                    inputPreferanser: {
                        ...state.inputPreferanser,
                        ...action.payload.inputPreferanser,
                    },
                };
            default:
                // eslint-disable-next-line no-console
                console.log('Unhandled action', action);
        }
    }
    return state;
};
