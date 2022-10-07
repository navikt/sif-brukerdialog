import { ArbeidFormValues } from '../../steg/arbeid/ArbeidSteg';
import { BarnFormValues } from '../../steg/barn/BarnSteg';
import { SøknadStegID } from '../../søknadStepsConfig';

export enum SøknadContextActionKeys {
    START_SØKNAD = 'startSøknad',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    SET_SØKNAD_STEG = 'setSøknadSteg',
    GÅ_TIL_NESTE_STEG = 'gåTilNesteSteg',
    GÅ_TIL_FORRIGE_STEG = 'gåTilForrigeSteg',
    SET_SØKNAD_BARN = 'setSøknadBarn',
    SET_SØKNAD_ARBEID = 'setSøknadArbeid',
}

interface StartSøknad {
    type: SøknadContextActionKeys.START_SØKNAD;
}
interface AvbrytSøknad {
    type: SøknadContextActionKeys.AVBRYT_SØKNAD;
}
interface SetSøknadSteg {
    type: SøknadContextActionKeys.SET_SØKNAD_STEG;
    payload: SøknadStegID;
}
interface GåTilNesteSteg {
    type: SøknadContextActionKeys.GÅ_TIL_NESTE_STEG;
    fraSteg: SøknadStegID;
}
interface GåTilForrigeSteg {
    type: SøknadContextActionKeys.GÅ_TIL_FORRIGE_STEG;
    fraSteg: SøknadStegID;
}
interface SetSøknadBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_BARN;
    payload: BarnFormValues;
}
interface SetSøknadArbeid {
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID;
    payload: ArbeidFormValues;
}

const startSøknad = (): StartSøknad => ({
    type: SøknadContextActionKeys.START_SØKNAD,
});

const avbrytSøknad = (): AvbrytSøknad => ({
    type: SøknadContextActionKeys.AVBRYT_SØKNAD,
});

const setSøknadBarn = (payload: BarnFormValues): SetSøknadBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_BARN,
    payload,
});
const setSøknadArbeid = (payload: ArbeidFormValues): SetSøknadArbeid => ({
    type: SøknadContextActionKeys.SET_SØKNAD_ARBEID,
    payload,
});
const setSøknadSteg = (payload: SøknadStegID): SetSøknadSteg => ({
    type: SøknadContextActionKeys.SET_SØKNAD_STEG,
    payload,
});
const gåTilNesteSteg = (fraSteg: SøknadStegID): GåTilNesteSteg => ({
    type: SøknadContextActionKeys.GÅ_TIL_NESTE_STEG,
    fraSteg,
});
const gåTilForrigeSteg = (fraSteg: SøknadStegID): GåTilForrigeSteg => ({
    type: SøknadContextActionKeys.GÅ_TIL_FORRIGE_STEG,
    fraSteg,
});

export type SøknadContextAction =
    | AvbrytSøknad
    | StartSøknad
    | SetSøknadBarn
    | SetSøknadSteg
    | SetSøknadArbeid
    | GåTilNesteSteg
    | GåTilForrigeSteg;

const actions = {
    startSøknad,
    avbrytSøknad,
    setSøknadSteg,
    setSøknadBarn,
    setSøknadArbeid,
    gåTilForrigeSteg,
    gåTilNesteSteg,
};

export default actions;
