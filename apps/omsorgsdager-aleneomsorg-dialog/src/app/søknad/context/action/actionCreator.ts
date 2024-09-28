import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { OmOmsorgenForBarnSøknadsdata } from '../../../types/søknadsdata/OmOmsorgenForBarnSøknadsdata';
import { TidspunktForAleneomsorgSøknadsdata } from '../../../types/søknadsdata/TidspunktForAleneomsorgSøknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    SET_IS_RELOADING_APP = 'setIsReloadingApp',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_OM_OMSORGEN_FOR_BARN = 'setSøknadOmOmsorgenForBarn',
    SET_SØKNAD_TIDSPUNKT_FOR_ALENEOMSORG = 'setSøknadTidspunktForAleneomsorg',
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

interface SetSøknadOmOmsorgenForBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_OM_OMSORGEN_FOR_BARN;
    payload: OmOmsorgenForBarnSøknadsdata;
}

interface SetSøknadTidspunktForAleneomsorg {
    type: SøknadContextActionKeys.SET_SØKNAD_TIDSPUNKT_FOR_ALENEOMSORG;
    payload: TidspunktForAleneomsorgSøknadsdata;
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

const setSøknadOmOmsorgenForBarn = (payload: OmOmsorgenForBarnSøknadsdata): SetSøknadOmOmsorgenForBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OM_OMSORGEN_FOR_BARN,
    payload,
});

const setSøknadTidspunktForAleneomsorg = (
    payload: TidspunktForAleneomsorgSøknadsdata,
): SetSøknadTidspunktForAleneomsorg => ({
    type: SøknadContextActionKeys.SET_SØKNAD_TIDSPUNKT_FOR_ALENEOMSORG,
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
    | SetSøknadOmOmsorgenForBarn
    | SetSøknadTidspunktForAleneomsorg
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
    setSøknadOmOmsorgenForBarn,
    setSøknadTidspunktForAleneomsorg,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
