import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useMellomlagring } from './useMellomlagring';
import { relocateToDinePleiepenger } from '../utils/navigationUtils';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';

const useAvbrytEllerFortsettSenere = () => {
    const navigate = useNavigate();
    const { dispatch } = useSøknadContext();
    const { slettMellomlagring } = useMellomlagring();
    const { logHendelse } = useAmplitudeInstance();

    const avbrytSøknad = useCallback(async () => {
        dispatch(actionsCreator.avbrytSøknad());
        await logHendelse(ApplikasjonHendelse.avbryt);
        await slettMellomlagring();
        navigate('/');
    }, [navigate, slettMellomlagring, logHendelse, dispatch]);

    const fortsettSøknadSenere = useCallback(async () => {
        dispatch(actionsCreator.fortsettSøknadSenere());
        await logHendelse(ApplikasjonHendelse.fortsettSenere);
        setTimeout(() => {
            relocateToDinePleiepenger();
        });
    }, [dispatch, logHendelse]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
