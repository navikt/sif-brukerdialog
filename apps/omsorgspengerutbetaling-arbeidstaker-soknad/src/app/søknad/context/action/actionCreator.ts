import { TempFormValues } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import {
    DeltBostedSøknadsdata,
    FraværSøknadsdata,
    LegeerklæringSøknadsdata,
    MedlemskapSøknadsdata,
    SituasjonSøknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_IS_RELOADING_APP = 'setIsReloadingApp',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_DINE_BARN = 'setSøknadDineBarn',
    SET_SØKNAD_DELT_BOSTED = 'setSøknadDeltBosted',
    SET_SØKNAD_SITUASJON = 'setSøknadSituasjon',
    SET_SØKNAD_FRAVÆR = 'setSøknadFravær',
    SET_SØKNAD_LEGEERKLÆRING = 'setSøknadLegeerklæring',
    SET_SØKNAD_MEDLEMSKAP = 'setSøknadMedlemskap',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
    SET_SØKNAD_TEMP_FORM_VALUES = 'setSøknadTempFormValues',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
    SET_SØKNAD_SENDT = 'setSøknadSendt',
    SET_UNSUBMITTED_STEP_FORM_VALUES = 'setUnsubmittedStepFormValues',
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
interface SetIsReloadingApp {
    type: SøknadContextActionKeys.SET_IS_RELOADING_APP;
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

interface SetSøknadDineBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_DINE_BARN;
    payload: DineBarnSøknadsdata;
}

interface SetSøknadDeltBosted {
    type: SøknadContextActionKeys.SET_SØKNAD_DELT_BOSTED;
    payload: DeltBostedSøknadsdata;
}

interface SetSøknadSituasjon {
    type: SøknadContextActionKeys.SET_SØKNAD_SITUASJON;
    payload: SituasjonSøknadsdata;
}

interface SetSøknadFravær {
    type: SøknadContextActionKeys.SET_SØKNAD_FRAVÆR;
    payload: FraværSøknadsdata;
}

interface SetSøknadLegeerklæring {
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING;
    payload: LegeerklæringSøknadsdata;
}

interface SetSøknadMedlemskap {
    type: SøknadContextActionKeys.SET_SØKNAD_MEDLEMSKAP;
    payload: MedlemskapSøknadsdata;
}

interface SetSøknadHarBekreftetOpplysninger {
    type: SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER;
    payload: OppsummeringFormValues;
}

interface SetSøknadTempFormValues {
    type: SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_VALUES;
    payload: TempFormValues;
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

const setIsReloadingApp = (): SetIsReloadingApp => ({
    type: SøknadContextActionKeys.SET_IS_RELOADING_APP,
});

const setSøknadLagret = (): SetSøknadLagret => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LAGRET,
});

const setSøknadSendt = (): SetSøknadSendt => ({
    type: SøknadContextActionKeys.SET_SØKNAD_SENDT,
});

const setSøknadSituasjon = (payload: SituasjonSøknadsdata): SetSøknadSituasjon => {
    return {
        type: SøknadContextActionKeys.SET_SØKNAD_SITUASJON,
        payload,
    };
};

const setSøknadDineBarn = (payload: DineBarnSøknadsdata): SetSøknadDineBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_DINE_BARN,
    payload,
});

const setSøknadDeltBosted = (payload: DeltBostedSøknadsdata): SetSøknadDeltBosted => ({
    type: SøknadContextActionKeys.SET_SØKNAD_DELT_BOSTED,
    payload,
});

const setSøknadFravær = (payload: FraværSøknadsdata): SetSøknadFravær => ({
    type: SøknadContextActionKeys.SET_SØKNAD_FRAVÆR,
    payload,
});

const setSøknadLegeerklæring = (payload: LegeerklæringSøknadsdata): SetSøknadLegeerklæring => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING,
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

const setSøknadTempFormValues = (payload: TempFormValues): SetSøknadTempFormValues => ({
    type: SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_VALUES,
    payload,
});

const setSøknadRoute = (payload: SøknadRoutes): SetSøknadRoute => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE,
    payload,
});

export type SøknadContextAction =
    | StartSøknad
    | AvbrytSøknad
    | ResetSøknad
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | SetIsReloadingApp
    | SetSøknadLagret
    | SetSøknadDineBarn
    | SetSøknadDeltBosted
    | SetSøknadSendt
    | SetSøknadSituasjon
    | SetSøknadFravær
    | SetSøknadLegeerklæring
    | SetSøknadMedlemskap
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadTempFormValues
    | SetSøknadRoute;

const actionsCreator = {
    resetSøknad,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setIsReloadingApp,
    setSøknadRoute,
    setSøknadDineBarn,
    setSøknadDeltBosted,
    setSøknadSituasjon,
    setSøknadFravær,
    setSøknadLegeerklæring,
    setSøknadMedlemskap,
    setSøknadHarBekreftetOpplysninger,
    setSøknadTempFormValues,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
