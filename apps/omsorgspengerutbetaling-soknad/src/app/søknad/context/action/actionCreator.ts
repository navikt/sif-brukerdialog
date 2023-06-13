import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { SmittevernDokumenterSøknadsdata } from '../../../types/søknadsdata/SmittevernDokumenterSøknadsdata';
import {
    DineBarnSøknadsdata,
    FraværSøknadsdata,
    LegeerklæringSøknadsdata,
    ArbeidSøknadsdata,
    FraværFraSøknadsdata,
    MedlemskapSøknadsdata,
    StengtBhgSkoleDokumenterSøknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_DINE_BARN = 'setSøknadDineBarn',
    SET_SØKNAD_FRAVÆR = 'setSøknadFravær',
    SET_SØKNAD_SMITTEVERN_DOKUMENTER = 'setSøknadSmittevernDokumenter',
    DOKUMENTER_STENGT_SKOLE_BHG = 'setSøknadStengtBhgSkoleDokumenter',
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
interface SetSøknadDineBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_DINE_BARN;
    payload: DineBarnSøknadsdata;
}
interface SetSøknadFravær {
    type: SøknadContextActionKeys.SET_SØKNAD_FRAVÆR;
    payload: FraværSøknadsdata;
}
interface SetSøknadSmittevernDokumenter {
    type: SøknadContextActionKeys.SET_SØKNAD_SMITTEVERN_DOKUMENTER;
    payload: SmittevernDokumenterSøknadsdata;
}

interface SetSøknadStengtBhgSkoleDokumenter {
    type: SøknadContextActionKeys.DOKUMENTER_STENGT_SKOLE_BHG;
    payload: StengtBhgSkoleDokumenterSøknadsdata;
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

const setSøknadDineBarn = (payload: DineBarnSøknadsdata): SetSøknadDineBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_DINE_BARN,
    payload,
});
const setSøknadFravær = (payload: FraværSøknadsdata): SetSøknadFravær => ({
    type: SøknadContextActionKeys.SET_SØKNAD_FRAVÆR,
    payload,
});

const setSøknadSmittevernDokumenter = (payload: SmittevernDokumenterSøknadsdata): SetSøknadSmittevernDokumenter => ({
    type: SøknadContextActionKeys.SET_SØKNAD_SMITTEVERN_DOKUMENTER,
    payload,
});

const setSøknadStengtBhgSkoleDokumenter = (
    payload: StengtBhgSkoleDokumenterSøknadsdata
): SetSøknadStengtBhgSkoleDokumenter => ({
    type: SøknadContextActionKeys.DOKUMENTER_STENGT_SKOLE_BHG,
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
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | SetSøknadLagret
    | SetSøknadSendt
    | SetSøknadDineBarn
    | SetSøknadFravær
    | SetSøknadSmittevernDokumenter
    | SetSøknadStengtBhgSkoleDokumenter
    | SetSøknadLegeerklæring
    | SetSøknadArbeidssituasjon
    | SetSøknadFraværFra
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
    setSøknadDineBarn,
    setSøknadFravær,
    setSøknadSmittevernDokumenter,
    setSøknadStengtBhgSkoleDokumenter,
    setSøknadLegeerklæring,
    setSøknadArbeidssituasjon,
    setSøknadFraværFra,
    setSøknadMedlemskap,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
