import { SøknadFormValues } from '../../../types/SøknadFormValues';
import { BarnFormValues } from '../../steps/barn/BarnStep';

export enum SøknadContextActionKeys {
    SET_FORM_VALUES = 'setFormValues',
    SET_FORSTÅR_RETTIGHETER_OG_PLIKTER = 'setVelkommen',
    SET_SØKNAD_BARN = 'setSøknadBarn',
}

interface SetVelkommen {
    type: SøknadContextActionKeys.SET_FORSTÅR_RETTIGHETER_OG_PLIKTER;
    payload: boolean;
}
interface SetFormValues {
    type: SøknadContextActionKeys.SET_FORM_VALUES;
    payload: Partial<SøknadFormValues>;
}

interface SetSøknadBarn {
    type: SøknadContextActionKeys.SET_SØKNAD_BARN;
    payload: BarnFormValues;
}

const setVelkommen = (payload: boolean): SetVelkommen => ({
    type: SøknadContextActionKeys.SET_FORSTÅR_RETTIGHETER_OG_PLIKTER,
    payload,
});

const setFormValues = (payload: Partial<SøknadFormValues>): SetFormValues => ({
    type: SøknadContextActionKeys.SET_FORM_VALUES,
    payload,
});

const setSøknadBarn = (payload: BarnFormValues): SetSøknadBarn => ({
    type: SøknadContextActionKeys.SET_SØKNAD_BARN,
    payload,
});

export type SøknadContextAction = SetVelkommen | SetFormValues | SetSøknadBarn;

const actions = {
    setVelkommen,
    setFormValues,
    setSøknadBarn,
};

export default actions;
