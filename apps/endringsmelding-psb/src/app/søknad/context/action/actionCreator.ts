import { StepId } from '../../config/StepId';
import { SøknadRoutes } from '../../config/SøknadRoutes';
import { AktivitetSøknadsdata, ArbeidstidSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';
import { Sak } from '../../../types/Sak';
import { ArbeidstidAktivitetEndring } from '../../../types/ArbeidstidAktivitetEndring';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_AKTIVITET = 'setSøknadAktivitet',
    SET_SØKNAD_ARBEIDSTID = 'setSøknadArbeidstid',
    SET_ARBEIDSTID_AKTIVITET_ENDRING = 'setArbeidstidAktivitetEndring',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
    SET_SØKNAD_SENDT = 'setSøknadSendt',
    SET_UNSUBMITTED_STEP_FORM_VALUES = 'setUnsubmittedStepFormValues',
    CLEAR_STEP_SØKNADSDATA = 'clearStepSøknadsdata',
}

interface ResetSøknad {
    type: SøknadContextActionKeys.RESET_SØKNAD;
}
interface StartSøknad {
    type: SøknadContextActionKeys.START_SØKNAD;
    payload: { sak: Sak };
}
interface AvbrytSøknad {
    type: SøknadContextActionKeys.AVBRYT_SØKNAD;
}
interface FortsettSøknadSenere {
    type: SøknadContextActionKeys.FORTSETT_SØKNAD_SENERE;
}
interface RequestLagreSøknad {
    type: SøknadContextActionKeys.REQUEST_LAGRE_SØKNAD;
}
interface SetSøknadLagret {
    type: SøknadContextActionKeys.SET_SØKNAD_LAGRET;
}
interface SetSøknadSendt {
    type: SøknadContextActionKeys.SET_SØKNAD_SENDT;
}
interface SetSøknadRoute {
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE;
    payload: SøknadRoutes;
}
interface SetSøknadAktivitet {
    type: SøknadContextActionKeys.SET_SØKNAD_AKTIVITET;
    payload: AktivitetSøknadsdata;
}
interface SetSøknadArbeidstid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID;
    payload: ArbeidstidSøknadsdata;
}

interface SetSøknadHarBekreftetOpplysninger {
    type: SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER;
    payload: OppsummeringFormValues;
}
interface ClearStepSøknadsdata {
    type: SøknadContextActionKeys.CLEAR_STEP_SØKNADSDATA;
    payload: { stepId: StepId };
}

interface SetArbeidstidAktivitetEndring {
    type: SøknadContextActionKeys.SET_ARBEIDSTID_AKTIVITET_ENDRING;
    payload: { endring: ArbeidstidAktivitetEndring };
}

const resetSøknad = (): ResetSøknad => ({
    type: SøknadContextActionKeys.RESET_SØKNAD,
});

const startSøknad = (sak: Sak): StartSøknad => ({
    type: SøknadContextActionKeys.START_SØKNAD,
    payload: { sak },
});

const avbrytSøknad = (): AvbrytSøknad => ({
    type: SøknadContextActionKeys.AVBRYT_SØKNAD,
});

const fortsettSøknadSenere = (): FortsettSøknadSenere => ({
    type: SøknadContextActionKeys.FORTSETT_SØKNAD_SENERE,
});

const requestLagreSøknad = (): RequestLagreSøknad => ({
    type: SøknadContextActionKeys.REQUEST_LAGRE_SØKNAD,
});

const setSøknadLagret = (): SetSøknadLagret => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LAGRET,
});
const setSøknadSendt = (): SetSøknadSendt => ({
    type: SøknadContextActionKeys.SET_SØKNAD_SENDT,
});

const setSøknadAktivitet = (payload: AktivitetSøknadsdata): SetSøknadAktivitet => ({
    type: SøknadContextActionKeys.SET_SØKNAD_AKTIVITET,
    payload,
});
const setSøknadArbeidstid = (payload: ArbeidstidSøknadsdata): SetSøknadArbeidstid => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID,
    payload,
});

const setSøknadHarBekreftetOpplysninger = (payload: OppsummeringFormValues): SetSøknadHarBekreftetOpplysninger => ({
    type: SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER,
    payload,
});
const setSøknadRoute = (payload: SøknadRoutes): SetSøknadRoute => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE,
    payload,
});

const clearStepSøknadsdata = (stepId: StepId): ClearStepSøknadsdata => ({
    type: SøknadContextActionKeys.CLEAR_STEP_SØKNADSDATA,
    payload: {
        stepId,
    },
});

const setArbeidstidAktivitetEndring = (endring: ArbeidstidAktivitetEndring): SetArbeidstidAktivitetEndring => ({
    type: SøknadContextActionKeys.SET_ARBEIDSTID_AKTIVITET_ENDRING,
    payload: {
        endring,
    },
});

export type SøknadContextAction =
    | AvbrytSøknad
    | ClearStepSøknadsdata
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | ResetSøknad
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadLagret
    | SetSøknadAktivitet
    | SetSøknadArbeidstid
    | SetSøknadRoute
    | SetSøknadSendt
    | StartSøknad
    | SetArbeidstidAktivitetEndring;

const actionsCreator = {
    avbrytSøknad,
    clearStepSøknadsdata,
    fortsettSøknadSenere,
    requestLagreSøknad,
    resetSøknad,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadAktivitet,
    setSøknadArbeidstid,
    setSøknadRoute,
    setSøknadSendt,
    startSøknad,
    setArbeidstidAktivitetEndring,
};

export default actionsCreator;
