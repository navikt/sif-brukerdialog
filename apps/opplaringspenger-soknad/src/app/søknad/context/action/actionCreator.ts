import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidstidSøknadsdata } from '../../../types/søknadsdata/ArbeidstidSøknadsdata';
import { KvitteringInfo } from '../../../types/KvitteringInfo';
import { TempFormValues } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import {
    LegeerklæringSøknadsdata,
    KursSøknadsdata,
    ArbeidssituasjonSøknadsdata,
    MedlemskapSøknadsdata,
    OmBarnetFormSøknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_OM_BARNET = 'setSøknadOmBarnet',
    SET_SØKNAD_TEMP_FORM_DATA = 'setSøknadTempFormData',
    SET_SØKNAD_LEGEERKLÆRING = 'setSøknadLegeerklæring',
    SET_SØKNAD_KURS = 'setSøknadKurs',
    SET_SØKNAD_ARBEIDSSITUASJON = 'setSøknadArbeidssituasjon',
    SET_SØKNAD_ARBEIDSTID = 'setSøknadArbeidstid',
    SET_SØKNAD_FRILANSOPPDRAG = 'setSøknadFrilansoppdrag',
    SET_SØKNAD_MEDLEMSKAP = 'setSøknadMedlemskap',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
    SET_SØKNAD_SENDT = 'setSøknadSendt',
    SET_SØKNAD_KVITTERING_INFO = '',
    SET_UNSUBMITTED_STEP_FORM_VALUES = 'setUnsubmittedStepFormValues',
    SYNC_ARBEIDSTID_MED_KURSPERIODER = 'syncArbeidstidMedKursperioder',
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
interface SetSøknadOmBarnet {
    type: SøknadContextActionKeys.SET_SØKNAD_OM_BARNET;
    payload: OmBarnetFormSøknadsdata;
}
interface SetSøknadRoute {
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE;
    payload: SøknadRoutes;
}

interface SetSøknadTempFormData {
    type: SøknadContextActionKeys.SET_SØKNAD_TEMP_FORM_DATA;
    payload: TempFormValues;
}

interface SetSøknadLegeerklæring {
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING;
    payload: LegeerklæringSøknadsdata;
}

interface SetSøknadKurs {
    type: SøknadContextActionKeys.SET_SØKNAD_KURS;
    payload: KursSøknadsdata;
}

interface SetSøknadArbeidssituasjon {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSSITUASJON;
    payload: ArbeidssituasjonSøknadsdata;
}

interface SetSøknadArbeidstid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID;
    payload: ArbeidstidSøknadsdata;
}

interface SetSøknadFrilansoppdrag {
    type: SøknadContextActionKeys.SET_SØKNAD_FRILANSOPPDRAG;
    payload: Arbeidsgiver[];
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

interface SyncArbeidstidMedKursperioder {
    type: SøknadContextActionKeys.SYNC_ARBEIDSTID_MED_KURSPERIODER;
    payload?: KursSøknadsdata;
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

const setSøknadLegeerklæring = (payload: LegeerklæringSøknadsdata): SetSøknadLegeerklæring => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LEGEERKLÆRING,
    payload,
});

const setSøknadKurs = (payload: KursSøknadsdata): SetSøknadKurs => ({
    type: SøknadContextActionKeys.SET_SØKNAD_KURS,
    payload,
});

const setSøknadOmBarnet = (payload: OmBarnetFormSøknadsdata): SetSøknadOmBarnet => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OM_BARNET,
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

const setSøknadFrilansoppdrag = (payload: Arbeidsgiver[]): SetSøknadFrilansoppdrag => ({
    type: SøknadContextActionKeys.SET_SØKNAD_FRILANSOPPDRAG,
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

const syncArbeidstidMedKursperioder = (payload: KursSøknadsdata): SyncArbeidstidMedKursperioder => ({
    type: SøknadContextActionKeys.SYNC_ARBEIDSTID_MED_KURSPERIODER,
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
    | SetSøknadOmBarnet
    | SetSøknadTempFormData
    | SetSøknadLegeerklæring
    | SetSøknadKurs
    | SetSøknadArbeidssituasjon
    | SetSøknadArbeidstid
    | SetSøknadFrilansoppdrag
    | SetSøknadMedlemskap
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadKvitteringInfo
    | SetSøknadRoute
    | SyncArbeidstidMedKursperioder;

const actionsCreator = {
    resetSøknad,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setSøknadRoute,
    setSøknadTempFormData,
    setSøknadLegeerklæring,
    setSøknadKurs,
    setSøknadArbeidssituasjon,
    setSøknadArbeidstid,
    setSøknadFrilansoppdrag,
    setSøknadMedlemskap,
    setSøknadHarBekreftetOpplysninger,
    setSøknadKvitteringInfo,
    setSøknadLagret,
    setSøknadOmBarnet,
    setSøknadSendt,
    syncArbeidstidMedKursperioder,
};

export default actionsCreator;
