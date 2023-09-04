import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { relocateToMinSide } from '../utils/navigationUtils';
import { useMellomlagring } from './useMellomlagring';

const useAvbrytEllerFortsettSenere = () => {
    const navigate = useNavigate();
    const { dispatch } = useSøknadContext();
    const { slettMellomlagring } = useMellomlagring();
    const { clearAllSteps } = useStepFormValuesContext();

    const avbrytSøknad = useCallback(async () => {
        await slettMellomlagring();
        clearAllSteps();
        dispatch(actionsCreator.avbrytSøknad());
        navigate(SøknadRoutes.VELKOMMEN);
    }, [navigate, slettMellomlagring, clearAllSteps, dispatch]);

    const fortsettSøknadSenere = useCallback(() => {
        clearAllSteps();
        dispatch(actionsCreator.fortsettSøknadSenere());
        relocateToMinSide();
    }, [clearAllSteps, dispatch]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
