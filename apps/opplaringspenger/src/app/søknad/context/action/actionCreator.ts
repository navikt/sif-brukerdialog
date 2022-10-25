import { ArbeidFormValues } from '../../steg/arbeid/ArbeidSteg';
import { BarnFormValues } from '../../steg/barn/BarnSteg';
import { OpplæringFormValues } from '../../steg/opplæring/OpplæringSteg';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { OppsummeringFormValues } from '../../steg/oppsummering/OppsummeringSteg';

export enum SøknadContextActionKeys {
    RESET_SØKNAD = 'resetSøknad',
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    FORTSETT_SØKNAD_SENERE = 'fortsettSøknadSenere',
    SET_SØKNAD_ROUTE = 'setSøknadRoute',
    SET_SØKNAD_BARN = 'setSøknadBarn',
    SET_SØKNAD_ARBEID = 'setSøknadArbeid',
    SET_SØKNAD_OPPLÆRING = 'setSøknadOpplæring',
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
interface SetSøknadBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_BARN;
    payload: BarnFormValues;
}
interface SetSøknadArbeid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID;
    payload: ArbeidFormValues;
}
interface SetSøknadOpplæring {
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLÆRING;
    payload: OpplæringFormValues;
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

const setSøknadBarn = (payload: BarnFormValues): SetSøknadBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_BARN,
    payload,
});
const setSøknadArbeid = (payload: ArbeidFormValues): SetSøknadArbeid => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID,
    payload,
});
const setSøknadOpplæring = (payload: OpplæringFormValues): SetSøknadOpplæring => ({
    type: SøknadContextActionKeys.SET_SØKNAD_OPPLÆRING,
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
    | SetSøknadBarn
    | SetSøknadOpplæring
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
    setSøknadBarn,
    setSøknadArbeid,
    setSøknadOpplæring,
    setSøknadHarBekreftetOpplysninger,
    setSøknadLagret,
    setSøknadSendt,
};

export default actionsCreator;
