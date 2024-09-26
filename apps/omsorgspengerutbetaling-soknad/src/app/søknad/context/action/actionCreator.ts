import { TempFormValues } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import {
    DineBarnSøknadsdata,
    FraværSøknadsdata,
    LegeerklæringSøknadsdata,
    ArbeidSøknadsdata,
    FraværFraSøknadsdata,
    MedlemskapSøknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    SET_IS_RELOADING_APP = 'setIsReloadingApp',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_DINE_BARN = 'setSøknadDineBarn',
    SET_SØKNAD_TEMP_FORM_DATA = 'setSøknadTempFormData',
    SET_SØKNAD_FRAVÆR = 'setSøknadFravær',
    SET_SØKNAD_LEGEERKLÆRING = 'setSøknadLegeerklæring',
    SET_SØKNAD_ARBEIDSSITUASJON = 'setSøknadArbeidssituasjon',
    SET_SØKNAD_FRAVÆR_FRA = 'setSøknadFraværFra',
    SET_SØKNAD_MEDLEMSKAP = 'setSøknadMedlemskap',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
    SET_SØKNAD_SENDT = 'setSøknadSendt',
    SET_UNSUBMITTED_STEP_FORM_VALUES = 'setUnsubmittedStepFormValues',
}

interface ResetSøknad {
    type: SøknadContextActionKeys.RESET_SØKNAD;
}
interface SetIsReloadingApp {
    type: SøknadContextActionKeys.SET_IS_RELOADING_APP;
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

interface SetSøknadTempFormData {
    type: SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_DATA;
    payload: TempFormValues;
}
interface SetSøknadRoute {
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE;
    payload: SøknadRoutes;
}
interface SetSøknadDineBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_DINE_BARN;
    payload: DineBarnSøknadsdata;
}

interface SetSøknadFravær {
    type: SøknadContextActionKeys.SET_SØKNAD_FRAVÆR;
    payload: FraværSøknadsdata;
}

interface SetSøknadLegeerklæring {
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING;
    payload: LegeerklæringSøknadsdata;
}
interface SetSøknadArbeidssituasjon {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON;
    payload: ArbeidSøknadsdata;
}
interface SetSøknadFraværFra {
    type: SøknadContextActionKeys.SET_SØKNAD_FRAVÆR_FRA;
    payload: FraværFraSøknadsdata;
}
interface SetSøknadMedlemskap {
    type: SøknadContextActionKeys.SET_SØKNAD_MEDLEMSKAP;
    payload: MedlemskapSøknadsdata;
}

interface SetSøknadHarBekreftetOpplysninger {
    type: SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER;
    payload: OppsummeringFormValues;
}

const resetSøknad = (): ResetSøknad => ({
    type: SøknadContextActionKeys.RESET_SØKNAD,
});

const setIsReloadingApp = (): SetIsReloadingApp => ({
    type: SøknadContextActionKeys.SET_IS_RELOADING_APP,
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

const setSøknadTempFormData = (payload: TempFormValues): SetSøknadTempFormData => ({
    type: SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_DATA,
    payload,
});

const setSøknadDineBarn = (payload: DineBarnSøknadsdata): SetSøknadDineBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_DINE_BARN,
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
const setSøknadArbeidssituasjon = (payload: ArbeidSøknadsdata): SetSøknadArbeidssituasjon => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON,
    payload,
});
const setSøknadFraværFra = (payload: FraværFraSøknadsdata): SetSøknadFraværFra => ({
    type: SøknadContextActionKeys.SET_SØKNAD_FRAVÆR_FRA,
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

export type SøknadContextAction =
    | StartSøknad
    | AvbrytSøknad
    | ResetSøknad
    | SetIsReloadingApp
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | SetSøknadLagret
    | SetSøknadSendt
    | SetSøknadTempFormData
    | SetSøknadDineBarn
    | SetSøknadFravær
    | SetSøknadLegeerklæring
    | SetSøknadArbeidssituasjon
    | SetSøknadFraværFra
    | SetSøknadMedlemskap
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadRoute;

const actionsCreator = {
    resetSøknad,
    setIsReloadingApp,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setSøknadRoute,
    setSøknadTempFormData,
    setSøknadDineBarn,
    setSøknadFravær,
    setSøknadLegeerklæring,
    setSøknadArbeidssituasjon,
    setSøknadFraværFra,
    setSøknadMedlemskap,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
