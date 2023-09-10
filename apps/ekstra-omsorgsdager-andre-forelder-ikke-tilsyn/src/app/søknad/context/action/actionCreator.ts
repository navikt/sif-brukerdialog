import { AnnenForelderenSituasjonSøknadsdata } from '../../../types/søknadsdata/AnnenForelderenSituasjonSøknadsdata';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';
import { OmBarnaSøknadsdata } from '../../../types/søknadsdata/OmBarnaSøknadsdata';
import { OmAnnenForelderSøknadsdata } from '../../../types/søknadsdata/OmAnnenForelderSøknadsdata';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_OM_ANNEN_FORELDER = 'setSøknadOmAnnenForelder',
    SET_SØKNAD_ANNEN_FORELDEREN_SITUASJON = 'setAnnenForelderenSituasjon',
    SET_SØKNAD_OM_BARNA = 'setSøknadOmBarna',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
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

interface SetSøknadOmAnnenForelder {
    type: SøknadContextActionKeys.SET_SØKNAD_OM_ANNEN_FORELDER;
    payload: OmAnnenForelderSøknadsdata;
}

interface SetSøknadAnnenForelderenSituasjon {
    type: SøknadContextActionKeys.SET_SØKNAD_ANNEN_FORELDEREN_SITUASJON;
    payload: AnnenForelderenSituasjonSøknadsdata;
}

interface SetSøknadOmBarna {
    type: SøknadContextActionKeys.SET_SØKNAD_OM_BARNA;
    payload: OmBarnaSøknadsdata;
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

const setSøknadLagret = (): SetSøknadLagret => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LAGRET,
});
const setSøknadSendt = (): SetSøknadSendt => ({
    type: SøknadContextActionKeys.SET_SØKNAD_SENDT,
});

const setSøknadOmAnnenForelder = (payload: OmAnnenForelderSøknadsdata): SetSøknadOmAnnenForelder => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OM_ANNEN_FORELDER,
    payload,
});

const setSøknadAnnenForelderenSituasjon = (
    payload: AnnenForelderenSituasjonSøknadsdata,
): SetSøknadAnnenForelderenSituasjon => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ANNEN_FORELDEREN_SITUASJON,
    payload,
});
const setSøknadOmBarna = (payload: OmBarnaSøknadsdata): SetSøknadOmBarna => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OM_BARNA,
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
    | SetSøknadLagret
    | SetSøknadSendt
    | SetSøknadOmAnnenForelder
    | SetSøknadAnnenForelderenSituasjon
    | SetSøknadOmBarna
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadRoute;

const actionsCreator = {
    resetSøknad,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setSøknadRoute,
    setSøknadOmAnnenForelder,
    setSøknadAnnenForelderenSituasjon,
    setSøknadOmBarna,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
