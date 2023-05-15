import { guid } from '@navikt/sif-common-utils';
import { SøknadContextState } from '../../../types/SøknadContextState';
import {
    ArbeidssituasjonSøknadsdata,
    ArbeidstidSøknadsdata,
    Søknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { getFeriedagerMeta, harFjernetLovbestemtFerie } from '../../../utils/lovbestemtFerieUtils';
import { SøknadRoutes } from '../../config/SøknadRoutes';
import { SøknadContextAction, SøknadContextActionKeys } from '../action/actionCreator';
import { EndringType } from '../../../types/EndringType';
import { getEndringerSomSkalGjøres } from '../../../utils/endringTypeUtils';
import { harUkjentArbeidsgiverMedRedusertJobb } from '../../../utils/ukjentArbeidsgiverUtils';

const initialSøknadsdata: Søknadsdata = {
    id: undefined,
} as any;

export const søknadReducer = (state: SøknadContextState, action: SøknadContextAction): SøknadContextState => {
    switch (action.type) {
        case SøknadContextActionKeys.START_SØKNAD:
            const { sak, hvaSkalEndres } = action.payload;
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
                hvaSkalEndres: [],
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
            case SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON:
                const arbeidstid = cleanupArbeidstidEtterArbeidssituasjon(
                    state.hvaSkalEndres,
                    state.søknadsdata,
                    action.payload
                );
                return {
                    ...state,
                    søknadsdata: {
                        ...state.søknadsdata,
                        arbeidstid,
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
                    endringsmeldingSendt: true,
                };
            case SøknadContextActionKeys.RESET_SØKNAD:
                return {
                    ...state,
                    børMellomlagres: false,
                    søknadsdata: initialSøknadsdata,
                    endringsmeldingSendt: false,
                    hvaSkalEndres: [],
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

export const cleanupArbeidstidEtterArbeidssituasjon = (
    hvaSkalEndres: EndringType[],
    { lovbestemtFerie, arbeidstid }: Søknadsdata,
    arbeidssituasjon: ArbeidssituasjonSøknadsdata
): ArbeidstidSøknadsdata | undefined => {
    if (!arbeidstid) {
        return undefined;
    }
    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres } = getEndringerSomSkalGjøres(
        hvaSkalEndres,
        harFjernetLovbestemtFerie(lovbestemtFerie),
        harUkjentArbeidsgiverMedRedusertJobb(arbeidssituasjon.arbeidsforhold)
    );
    /** Bruker skal kun endre ferie, kombinerer ikke jobb med pleiepenger og har ikke fjernet ferie */
    const arbeidAktivitetEndring = { ...arbeidstid.arbeidAktivitet };
    if (lovbestemtFerieSkalEndres && arbeidstidSkalEndres === false) {
        arbeidssituasjon.arbeidsforhold.forEach((a) => {
            if (arbeidAktivitetEndring[a.arbeidsgiverId]) {
                delete arbeidAktivitetEndring[a.arbeidsgiverId];
            }
        });
        if (Object.keys(arbeidAktivitetEndring).length === 0) {
            return undefined;
        }
        return {
            ...arbeidstid,
            arbeidAktivitet: arbeidAktivitetEndring,
        };
    }
    return arbeidstid;
};
