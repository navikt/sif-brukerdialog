import { useCallback } from 'react';
import { useSøknadContext } from '@hooks';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import actionsCreator from '../søknad/context/action/actionCreator';
import { relocateToMinSide, relocateToWelcomePage } from '../utils/navigationUtils';
import { useMellomlagring } from './useMellomlagring';

const useAvbrytEllerFortsettSenere = () => {
    const { dispatch } = useSøknadContext();
    const { slettMellomlagring } = useMellomlagring();
    const { logHendelse } = useAmplitudeInstance();

    const avbrytSøknad = useCallback(async () => {
        await logHendelse(ApplikasjonHendelse.avbryt);
        await slettMellomlagring();
        relocateToWelcomePage();
    }, [slettMellomlagring, logHendelse]);

    const fortsettSøknadSenere = useCallback(async () => {
        dispatch(actionsCreator.fortsettSøknadSenere());
        await logHendelse(ApplikasjonHendelse.fortsettSenere);
        setTimeout(() => {
            relocateToMinSide();
        });
    }, [dispatch, logHendelse]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
