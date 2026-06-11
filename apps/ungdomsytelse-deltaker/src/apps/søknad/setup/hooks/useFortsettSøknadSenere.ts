import { useCallback } from 'react';

import { ApplikasjonHendelse, useAnalyticsInstance } from '../../../../analytics/analytics';
import getLenker from '../../../../utils/lenker';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';

export const useFortsettSøknadSenere = () => {
    const { lagreSøknad } = useSøknadMellomlagring();
    const { logHendelse } = useAnalyticsInstance();

    return useCallback(async () => {
        await lagreSøknad();
        await logHendelse(ApplikasjonHendelse.fortsettSenere);
        window.location.href = getLenker().minSide;
    }, [lagreSøknad, logHendelse]);
};
