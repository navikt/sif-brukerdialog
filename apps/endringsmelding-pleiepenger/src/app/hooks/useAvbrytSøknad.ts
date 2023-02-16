import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useMellomlagring } from './useMellomlagring';
import { relocateToDinePleiepenger } from '../utils/navigationUtils';

const useAvbrytEllerFortsettSenere = () => {
    const navigate = useNavigate();
    const { dispatch } = useSøknadContext();
    const { slettMellomlagring } = useMellomlagring();

    const avbrytSøknad = useCallback(async () => {
        dispatch(actionsCreator.avbrytSøknad());
        await slettMellomlagring();
        navigate('/');
    }, [navigate, slettMellomlagring, dispatch]);

    const fortsettSøknadSenere = useCallback(() => {
        dispatch(actionsCreator.fortsettSøknadSenere());
        setTimeout(() => {
            relocateToDinePleiepenger();
        });
    }, [dispatch]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
