import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useMellomlagring } from './useMellomlagring';
import { SøknadRoutes } from '../types/SøknadRoutes';

const useAvbrytEllerFortsettSenere = () => {
    const navigate = useNavigate();
    const { dispatch } = useSøknadContext();
    const { slettMellomlagring } = useMellomlagring();

    const avbrytSøknad = useCallback(async () => {
        await slettMellomlagring();
        dispatch(actionsCreator.avbrytSøknad());
        setTimeout(() => {
            navigate(SøknadRoutes.VELKOMMEN);
        });
    }, [navigate, slettMellomlagring, dispatch]);

    const fortsettSøknadSenere = useCallback(() => {
        dispatch(actionsCreator.fortsettSøknadSenere());
        setTimeout(() => {
            navigate('/');
        });
    }, [navigate, dispatch]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
