export enum SøknadContextActionKeys {
    SET_HARGODKJENTVILKÅR = 'setVelkommen',
}

interface SetVelkommen {
    type: SøknadContextActionKeys.SET_HARGODKJENTVILKÅR;
    payload: boolean;
}

const setVelkommen = (payload: boolean): SetVelkommen => ({
    type: SøknadContextActionKeys.SET_HARGODKJENTVILKÅR,
    payload,
});

export type SøknadContextAction = SetVelkommen;

export default {
    setVelkommen,
};
