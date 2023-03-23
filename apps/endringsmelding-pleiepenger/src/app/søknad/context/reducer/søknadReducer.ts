import { guid } from '@navikt/sif-common-utils/lib';
import { EndringType } from '../../../types/EndringType';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { SøknadRoutes } from '../../config/SøknadRoutes';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';

const initialSøknadsdata: Søknadsdata = {
    id: undefined,
} as any;

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.START_SØKNAD:
            const { aktivitetSomSkalEndres, sak, hvaSkalEndres } = action.payload;
            return {
                ...state,
                søknadsdata: {
                    id: guid(),
                    harForståttRettigheterOgPlikter: true,
                    aktivitet: aktivitetSomSkalEndres
                        ? { aktivitetSomSkalEndres: [aktivitetSomSkalEndres.id] }
                        : undefined,
                    lovbestemtFerie: {
                        perioderMedFerie: sak.lovbestemtFerie.perioder,
                        perioderFjernet: [],
                        perioderLagtTil: [],
                    },
                },
                sak,
                hvaSkalEndres,
                søknadRoute: SøknadRoutes.ARBEIDSTID,
                børMellomlagres: true,
            };
        case SøknadContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...state,
                søknadsdata: initialSøknadsdata,
                søknadRoute: undefined,
                /**
                 * Alle typer legges inn for å unngå at dynamiske steg fjernes når søknadsdata tømmes
                 * Verdien settes på nytt når søker starter ny meldning
                 */
                hvaSkalEndres: [EndringType.arbeidstid, EndringType.lovbestemtFerie],
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
            case SøknadContextActionKeys.SET_SØKNAD_AKTIVITET:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        aktivitet: {
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
            case SøknadContextActionKeys.SET_SØKNAD_LOVBESTEMT_FERIE:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        lovbestemtFerie: {
                            ...action.payload,
                        },
                    },
                };

            case SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER:
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        harBekreftetOpplysninger: action.payload.harBekreftetOpplysninger,
                    },
                };
            case SøknadContextActionKeys.SET_ENDRINGSMELDING_SENDT:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: initialSøknadsdata,
                    endringsmeldingSendt: true,
                };
            case SøknadContextActionKeys.RESET_SØKNAD:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: initialSøknadsdata,
                    endringsmeldingSendt: false,
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
