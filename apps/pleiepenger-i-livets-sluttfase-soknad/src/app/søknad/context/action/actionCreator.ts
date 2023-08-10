import { SøknadRoutes } from '../../../types/SøknadRoutes';
import {
    OpplysningerOmPleietrengendeSøknadsdata,
    LegeerklæringSøknadsdata,
    TidsromSøknadsdata
    ArbeidssituasjonSøknadsdata,
    ArbeidstidSøknadsdata,
    MedlemskapSøknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_OPPLYSNINGER_OM_PLEIETRENGENDE = 'setSøknadOpplysningerOmPleietrengende',
    SET_SØKNAD_LEGEERKLÆRING = 'setSøknadLegeerklæring',
    SET_SØKNAD_TIDSROM = 'setSøknadTidsrom',
    SET_SØKNAD_ARBEIDSSITUASJON = 'setSøknadArbeidssituasjon',
    SET_SØKNAD_ARBEIDSTID = 'setSøknadArbeidstid',
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
interface SetSøknadOpplysningerOmPleietrengende {
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLYSNINGER_OM_PLEIETRENGENDE;
    payload: OpplysningerOmPleietrengendeSøknadsdata;
}

interface SetSøknadLegeerklæring {
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING;
    payload: LegeerklæringSøknadsdata;
}

interface SetSøknadTidsrom {
    type: SøknadContextActionKeys.SET_SØKNAD_TIDSROM;
    payload: TidsromSøknadsdata;
}

interface SetSøknadArbeidssituasjon {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON;
    payload: ArbeidssituasjonSøknadsdata;
}
interface SetSøknadArbeidstid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID;
    payload: ArbeidstidSøknadsdata;
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

const setSøknadOpplysningerOmPleietrengende = (
    payload: OpplysningerOmPleietrengendeSøknadsdata
): SetSøknadOpplysningerOmPleietrengende => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLYSNINGER_OM_PLEIETRENGENDE,
    payload,
});

const setSøknadLegeerklæring = (payload: LegeerklæringSøknadsdata): SetSøknadLegeerklæring => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING,
    payload,
});

const setSøknadTidsrom = (payload: TidsromSøknadsdata): SetSøknadTidsrom => ({
    type: SøknadContextActionKeys.SET_SØKNAD_TIDSROM,
    payload,
});

const setSøknadArbeidssituasjon = (payload: ArbeidssituasjonSøknadsdata): SetSøknadArbeidssituasjon => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON,
    payload,
});
const setSøknadArbeidstid = (payload: ArbeidstidSøknadsdata): SetSøknadArbeidstid => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID,
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
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | SetSøknadLagret
    | SetSøknadSendt
    | SetSøknadOpplysningerOmPleietrengende
    | SetSøknadLegeerklæring
    | SetSøknadTidsrom
    | SetSøknadArbeidssituasjon
    | SetSøknadArbeidstid
    | SetSøknadMedlemskap
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadRoute;

const actionsCreator = {
    resetSøknad,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setSøknadRoute,
    setSøknadOpplysningerOmPleietrengende,
    setSøknadLegeerklæring,
    setSøknadTidsrom,
    setSøknadArbeidssituasjon,
    setSøknadArbeidstid,
    setSøknadMedlemskap,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
