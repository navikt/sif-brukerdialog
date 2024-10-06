import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { DeltBostedSøknadsdata } from '../../../types/søknadsdata/DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata, OmBarnetSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_IS_RELOADING_APP = 'setIsReloadingApp',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_OM_BARNET = 'setSøknadOmBarnet',
    SET_SØKNAD_DELT_BOSTED = 'setSøknadDeltBosted',
    SET_SØKNAD_LEGEERKLÆRING = 'setSøknadLegeerklæring',
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
interface SetSøknadRoute {
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE;
    payload: SøknadRoutes;
}
interface SetSøknadOmBarnet {
    type: SøknadContextActionKeys.SET_SØKNAD_OM_BARNET;
    payload: OmBarnetSøknadsdata;
}
interface SetSøknadDeltBosted {
    type: SøknadContextActionKeys.SET_SØKNAD_DELT_BOSTED;
    payload: DeltBostedSøknadsdata;
}
interface SetSøknadLegeerklæring {
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING;
    payload: LegeerklæringSøknadsdata;
}
interface SetSøknadHarBekreftetOpplysninger {
    type: SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER;
    payload: OppsummeringFormValues;
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

const setSøknadOmBarnet = (payload: OmBarnetSøknadsdata): SetSøknadOmBarnet => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OM_BARNET,
    payload,
});
const setSøknadDeltBosted = (payload: DeltBostedSøknadsdata): SetSøknadDeltBosted => ({
    type: SøknadContextActionKeys.SET_SØKNAD_DELT_BOSTED,
    payload,
});
const setSøknadLegeerklæring = (payload: LegeerklæringSøknadsdata): SetSøknadLegeerklæring => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING,
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
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | SetIsReloadingApp
    | SetSøknadLagret
    | SetSøknadSendt
    | SetSøknadOmBarnet
    | SetSøknadDeltBosted
    | SetSøknadLegeerklæring
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadRoute;

const actionsCreator = {
    resetSøknad,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setIsReloadingApp,
    setSøknadRoute,
    setSøknadOmBarnet,
    setSøknadDeltBosted,
    setSøknadLegeerklæring,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
