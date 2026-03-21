import {
    ArbeidstidSøknadsdata,
    EndringType,
    LovbestemtFerieSøknadsdata,
    Sak,
    SøknadContextInputPreferanse,
    UkjentArbeidsforholdSøknadsdata,
} from '@app/types';

import { TilsynsordningSøknadsdata } from '../../../types/TilsynsordningSøknadsdata';
import { SøknadRoutes } from '../../config/SøknadRoutes';
import { StepId } from '../../config/StepId';
import { OppsummeringFormValues } from '../../steps/oppsummering/OppsummeringStep';

export enum SøknadContextActionKeys {
    SET_SAK = 'setSak',
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_UKJENT_ARBEIDSFOHOLD = 'setSøknadUkjentArbeidsforhold',
    SET_SØKNAD_ARBEIDSTID = 'setSøknadArbeidstid',
    SET_SØKNAD_LOVBESTEMT_FERIE = 'setSøknadLovbestemtFerie',
    SET_SØKNAD_TILSYNSORDNING = 'setSøknadTilsynsordning',
    SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER = 'setSøknadHarBekreftetOpplysninger',
    REQUEST_LAGRE_SØKNAD = 'requestLargeSøknad',
    SET_SØKNAD_LAGRET = 'setSøknadLagret',
    SET_ENDRINGSMELDING_SENDT = 'setEndringsmeldingSendt',
    SET_UNSUBMITTED_STEP_FORM_VALUES = 'setUnsubmittedStepFormValues',
    CLEAR_STEP_SØKNADSDATA = 'clearStepSøknadsdata',
    SET_INPUT_PREFERANSER = 'setInputPreferanser',
}

interface SetSak {
    type: SøknadContextActionKeys.SET_SAK;
    payload: { sak: Sak };
}
interface ResetSøknad {
    type: SøknadContextActionKeys.RESET_SØKNAD;
}
interface StartSøknad {
    type: SøknadContextActionKeys.START_SØKNAD;
    payload: { sak: Sak; valgtHvaSkalEndres: EndringType[] };
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
interface SetEndringsmeldingSendt {
    type: SøknadContextActionKeys.SET_ENDRINGSMELDING_SENDT;
}
interface SetSøknadRoute {
    type: SøknadContextActionKeys.SET_SØKNAD_ROUTE;
    payload: SøknadRoutes;
}
interface SetSøknadUkjentArbeidsforhold {
    type: SøknadContextActionKeys.SET_SØKNAD_UKJENT_ARBEIDSFOHOLD;
    payload: UkjentArbeidsforholdSøknadsdata;
}

interface SetSøknadArbeidstid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID;
    payload: ArbeidstidSøknadsdata;
}

interface SetSøknadLovbestemtFerie {
    type: SøknadContextActionKeys.SET_SØKNAD_LOVBESTEMT_FERIE;
    payload: LovbestemtFerieSøknadsdata;
}

interface SetSøknadTilsynsordning {
    type: SøknadContextActionKeys.SET_SØKNAD_TILSYNSORDNING;
    payload: TilsynsordningSøknadsdata;
}

interface SetSøknadHarBekreftetOpplysninger {
    type: SøknadContextActionKeys.SET_SØKNAD_HAR_BEKREFTET_OPPLYSNINGER;
    payload: OppsummeringFormValues;
}
interface ClearStepSøknadsdata {
    type: SøknadContextActionKeys.CLEAR_STEP_SØKNADSDATA;
    payload: { stepId: StepId };
}

interface SetInputPreferanser {
    type: SøknadContextActionKeys.SET_INPUT_PREFERANSER;
    payload: { inputPreferanser: Partial<SøknadContextInputPreferanse> };
}

const setSak = (sak: Sak): SetSak => ({
    type: SøknadContextActionKeys.SET_SAK,
    payload: { sak },
});

const resetSøknad = (): ResetSøknad => ({
    type: SøknadContextActionKeys.RESET_SØKNAD,
});

const startSøknad = (sak: Sak, valgtHvaSkalEndres: EndringType[]): StartSøknad => ({
    type: SøknadContextActionKeys.START_SØKNAD,
    payload: { sak, valgtHvaSkalEndres },
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

const setEndringsmeldingSendt = (): SetEndringsmeldingSendt => ({
    type: SøknadContextActionKeys.SET_ENDRINGSMELDING_SENDT,
});

const setSøknadUkjentArbeidsforhold = (payload: UkjentArbeidsforholdSøknadsdata): SetSøknadUkjentArbeidsforhold => ({
    type: SøknadContextActionKeys.SET_SØKNAD_UKJENT_ARBEIDSFOHOLD,
    payload,
});

const setSøknadArbeidstid = (payload: ArbeidstidSøknadsdata): SetSøknadArbeidstid => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEIDSTID,
    payload,
});

const setSøknadLovbestemtFerie = (payload: LovbestemtFerieSøknadsdata): SetSøknadLovbestemtFerie => ({
    type: SøknadContextActionKeys.SET_SØKNAD_LOVBESTEMT_FERIE,
    payload,
});

const setSøknadTilsynsordning = (payload: TilsynsordningSøknadsdata): SetSøknadTilsynsordning => ({
    type: SøknadContextActionKeys.SET_SØKNAD_TILSYNSORDNING,
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

const clearStepSøknadsdata = (stepId: StepId): ClearStepSøknadsdata => ({
    type: SøknadContextActionKeys.CLEAR_STEP_SØKNADSDATA,
    payload: {
        stepId,
    },
});

const setInputPreferanser = (inputPreferanser: SøknadContextInputPreferanse): SetInputPreferanser => ({
    type: SøknadContextActionKeys.SET_INPUT_PREFERANSER,
    payload: {
        inputPreferanser,
    },
});

export type SøknadContextAction =
    | SetSak
    | AvbrytSøknad
    | ClearStepSøknadsdata
    | FortsettSøknadSenere
    | RequestLagreSøknad
    | ResetSøknad
    | SetSøknadHarBekreftetOpplysninger
    | SetSøknadLagret
    | SetSøknadUkjentArbeidsforhold
    | SetSøknadArbeidstid
    | SetSøknadLovbestemtFerie
    | SetSøknadTilsynsordning
    | SetSøknadRoute
    | SetEndringsmeldingSendt
    | StartSøknad
    | SetInputPreferanser;

const actionsCreator = {
    setSak,
    avbrytSøknad,
    clearStepSøknadsdata,
    fortsettSøknadSenere,
    requestLagreSøknad,
    resetSøknad,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadUkjentArbeidsforhold,
    setSøknadArbeidstid,
    setSøknadLovbestemtFerie,
    setSøknadTilsynsordning,
    setSøknadRoute,
    setEndringsmeldingSendt,
    startSøknad,
    setInputPreferanser,
};

export default actionsCreator;
