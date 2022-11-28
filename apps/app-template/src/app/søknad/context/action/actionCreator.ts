import { StepId } from '../../../types/StepId';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { MedlemskapSøknadsdata } from '../../../types/søknadsdata/MedlemskapSøknadsdata';
import { PleietrengendeSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_PLEIETRENGENDE = 'setSøknadPleietrengende',
    SET_SØKNAD_MEDLEMSKAP = 'setSøknadMedlemskap',
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
interface SetSøknadPleietrengende {
    type: SøknadContextActionKeys.SET_SØKNAD_PLEIETRENGENDE;
    payload: PleietrengendeSøknadsdata;
}
interface SetSøknadMedlemskap {
    type: SøknadContextActionKeys.SET_SØKNAD_MEDLEMSKAP;
    payload: MedlemskapSøknadsdata;
}
interface SetSøknadHarBekreftetOpplysninger {
    type: SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER;
    payload: OppsummeringFormValues;
}
interface ClearStepSøknadsdata {
    type: SøknadContextActionKeys.CLEAR_STEP_SØKNADSDATA;
    payload: { stepId: StepId };
}

const resetSøknad = (): ResetSøknad => ({
    type: SøknadContextActionKeys.RESET_SØKNAD,
});

const startSøknad = (): StartSøknad => ({
    type: SøknadContextActionKeys.START_SØKNAD,
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

const setSøknadPleietrengende = (payload: PleietrengendeSøknadsdata): SetSøknadPleietrengende => ({
    type: SøknadContextActionKeys.SET_SØKNAD_PLEIETRENGENDE,
    payload,
});
const setSøknadMedlemskap = (payload: MedlemskapSøknadsdata): SetSøknadMedlemskap => ({
    type: SøknadContextActionKeys.SET_SØKNAD_MEDLEMSKAP,
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

export type SøknadContextAction =
    | AvbrytSøknad
    | ClearStepSøknadsdata
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | ResetSøknad
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadLagret
    | SetSøknadMedlemskap
    | SetSøknadPleietrengende
    | SetSøknadRoute
    | SetSøknadSendt
    | StartSøknad;

const actionsCreator = {
    avbrytSøknad,
    clearStepSøknadsdata,
    fortsettSøknadSenere,
    requestLagreSøknad,
    resetSøknad,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadMedlemskap,
    setSøknadPleietrengende,
    setSøknadRoute,
    setSøknadSendt,
    startSøknad,
};

export default actionsCreator;
