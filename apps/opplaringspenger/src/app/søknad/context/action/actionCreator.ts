import { MedlemskapSøknadsdata } from '../../../types/søknadsdata/MedlemskapSøknadsdata';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import {
    ArbeidSøknadsdata,
    InstitusjonSøknadsdata,
    OpplæringSøknadsdata,
    PleietrengendeSøknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_PLEIETRENGENDE = 'setSøknadPleietrengende',
    SET_SØKNAD_INSTITUSJON = 'setSøknadInstitusjon',
    SET_SØKNAD_ARBEID = 'setSøknadArbeid',
    SET_SØKNAD_OPPLÆRING = 'setSøknadOpplæring',
    SET_SØKNAD_MEDLEMSKAP = 'setSøknadMedlemskap',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
    SET_SØKNAD_SENDT = 'setSøknadSendt',
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
interface SetSøknadInstitusjon {
    type: SøknadContextActionKeys.SET_SØKNAD_INSTITUSJON;
    payload: InstitusjonSøknadsdata;
}
interface SetSøknadArbeid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID;
    payload: ArbeidSøknadsdata;
}
interface SetSøknadOpplæring {
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLÆRING;
    payload: OpplæringSøknadsdata;
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

const setSøknadPleietrengende = (payload: PleietrengendeSøknadsdata): SetSøknadPleietrengende => ({
    type: SøknadContextActionKeys.SET_SØKNAD_PLEIETRENGENDE,
    payload,
});
const setSøknadInstitusjon = (payload: InstitusjonSøknadsdata): SetSøknadInstitusjon => ({
    type: SøknadContextActionKeys.SET_SØKNAD_INSTITUSJON,
    payload,
});
const setSøknadArbeid = (payload: ArbeidSøknadsdata): SetSøknadArbeid => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID,
    payload,
});
const setSøknadOpplæring = (payload: OpplæringSøknadsdata): SetSøknadOpplæring => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLÆRING,
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
    | SetSøknadPleietrengende
    | SetSøknadInstitusjon
    | SetSøknadOpplæring
    | SetSøknadMedlemskap
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadRoute
    | SetSøknadArbeid;

const actionsCreator = {
    resetSøknad,
    startSøknad,
    avbrytSøknad,
    fortsettSøknadSenere,
    requestLagreSøknad,
    setSøknadRoute,
    setSøknadPleietrengende,
    setSøknadInstitusjon,
    setSøknadArbeid,
    setSøknadOpplæring,
    setSøknadMedlemskap,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
