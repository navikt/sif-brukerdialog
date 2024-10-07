import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../søknad/context/action/actionCreator';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { useStepFormValuesContext } from '../søknad/context/StepFormValuesContext';
import { relocateToMinSide } from '../utils/navigationUtils';
import { mellomlagringService } from '../api/mellomlagringService';

const useAvbrytEllerFortsettSenere = () => {
    const navigate = useNavigate();
    const { dispatch } = useSøknadContext();
    const { clearAllSteps } = useStepFormValuesContext();

    const avbrytSøknad = useCallback(async () => {
        await mellomlagringService.purge();
        clearAllSteps();
        dispatch(actionsCreator.avbrytSøknad());
        navigate(SøknadRoutes.VELKOMMEN);
    }, [navigate, clearAllSteps, dispatch]);

    const fortsettSøknadSenere = useCallback(() => {
        clearAllSteps();
        dispatch(actionsCreator.fortsettSøknadSenere());
        relocateToMinSide();
    }, [clearAllSteps, dispatch]);

    return { avbrytSøknad, fortsettSøknadSenere };
};

export default useAvbrytEllerFortsettSenere;
