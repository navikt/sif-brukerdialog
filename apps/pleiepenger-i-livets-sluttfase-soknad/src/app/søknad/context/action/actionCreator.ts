import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { KvitteringInfo } from '../../../types/KvitteringInfo';
import { TempFormValues } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import {
    OpplysningerOmPleietrengendeSøknadsdata,
    LegeerklæringSøknadsdata,
    TidsromSøknadsdata,
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
    SET_SØKNAD_TEMP_FORM_DATA = 'setSøknadTempFormData',
    SET_SØKNAD_OPPLYSNINGER_OM_PLEIETRENGENDE = 'setSøknadOpplysningerOmPleietrengende',
    SET_SØKNAD_LEGEERKLÆRING = 'setSøknadLegeerklæring',
    SET_SØKNAD_TIDSROM = 'setSøknadTidsrom',
    SET_SØKNAD_ARBEIDSSITUASJON = 'setSøknadArbeidssituasjon',
    SET_SØKNAD_FRILANSOPPDRAG = 'setSøknadFrilansoppdrag',
    SET_SØKNAD_ARBEIDSTID = 'setSøknadArbeidstid',
    SET_SØKNAD_MEDLEMSKAP = 'setSøknadMedlemskap',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
    SET_SØKNAD_SENDT = 'setSøknadSendt',
    SET_SØKNAD_KVITTERING_INFO = '',
    SET_UNSUBMITTED_STEP_FORM_VALUES = 'setUnsubmittedStepFormValues',
    SYNC_ARBEIDSTID_MED_TIDSROM = 'syncArbeidstidMedTidsrom',
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

interface SetSøknadTempFormData {
    type: SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_DATA;
    payload: TempFormValues;
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

interface SetSøknadFrilansoppdrag {
    type: SøknadContextActionKeys.SET_SØKNAD_FRILANSOPPDRAG;
    payload: Arbeidsgiver[];
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

interface SetSøknadKvitteringInfo {
    type: SøknadContextActionKeys.SET_SØKNAD_KVITTERING_INFO;
    payload?: KvitteringInfo;
}
interface SyncArbeidstidMedTidsrom {
    type: SøknadContextActionKeys.SYNC_ARBEIDSTID_MED_TIDSROM;
    payload?: TidsromSøknadsdata;
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

const setSøknadTempFormData = (payload: TempFormValues): SetSøknadTempFormData => ({
    type: SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_DATA,
    payload,
});

const setSøknadOpplysningerOmPleietrengende = (
    payload: OpplysningerOmPleietrengendeSøknadsdata,
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

const setSøknadFrilansoppdrag = (payload: Arbeidsgiver[]): SetSøknadFrilansoppdrag => ({
    type: SøknadContextActionKeys.SET_SØKNAD_FRILANSOPPDRAG,
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

const setSøknadKvitteringInfo = (payload: KvitteringInfo): SetSøknadKvitteringInfo => ({
    type: SøknadContextActionKeys.SET_SØKNAD_KVITTERING_INFO,
    payload,
});

const setSøknadRoute = (payload: SøknadRoutes): SetSøknadRoute => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE,
    payload,
});

const syncArbeidstidMedTidsrom = (payload: TidsromSøknadsdata): SyncArbeidstidMedTidsrom => ({
    type: SøknadContextActionKeys.SYNC_ARBEIDSTID_MED_TIDSROM,
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
    | SetSøknadTempFormData
    | SetSøknadOpplysningerOmPleietrengende
    | SetSøknadLegeerklæring
    | SetSøknadTidsrom
    | SetSøknadArbeidssituasjon
    | SetSøknadFrilansoppdrag
    | SetSøknadArbeidstid
    | SetSøknadMedlemskap
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadKvitteringInfo
    | SetSøknadRoute
    | SyncArbeidstidMedTidsrom;

const actionsCreator = {
    resetSøknad,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setSøknadRoute,
    setSøknadTempFormData,
    setSøknadOpplysningerOmPleietrengende,
    setSøknadLegeerklæring,
    setSøknadTidsrom,
    setSøknadArbeidssituasjon,
    setSøknadFrilansoppdrag,
    setSøknadArbeidstid,
    setSøknadMedlemskap,
    setSøknadHarBekreftetOpplysninger,
    setSøknadKvitteringInfo,
    setSøknadLagret,
    setSøknadSendt,
    syncArbeidstidMedTidsrom,
};

export default actionsCreator;
