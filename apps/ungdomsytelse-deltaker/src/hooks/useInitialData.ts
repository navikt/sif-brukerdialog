import { useState } from 'react';
import { deltakerService } from '@api/services/deltakerService';
import { DeltakerContextData } from '@context/DeltakerContext';
import { fetchBarn, fetchSøker } from '@navikt/sif-common-api';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { deltakelseErÅpenForRapportering } from '@utils/deltakelserUtils';

export type InitialData = DeltakerContextData;

export const useInitialData = () => {
    const [initialData, setInitialData] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    const fetchInitialData = async () => {
        setError(undefined);
        try {
            const søker = await fetchSøker();
            const deltakelser = await deltakerService.getDeltakelser();
            const barn = await fetchBarn();
            // const personalia = await personaliaService.fetch();

            const deltakelserSøktFor = deltakelser.filter((d) => d.harSøkt);
            const deltakelserIkkeSøktFor = deltakelser.filter((d) => !d.harSøkt);
            const deltakelserÅpenForRapportering = deltakelserSøktFor.filter(deltakelseErÅpenForRapportering);
            const site = deltakelserIkkeSøktFor.length > 0 ? 'soknad' : 'innsyn';

            setInitialData({
                barn,
                søker,
                // kontonummerInfo: personalia?.personalia,
                deltakelser,
                deltakelserSøktFor,
                deltakelserIkkeSøktFor,
                deltakelserÅpenForRapportering,
                site,
            });
            setIsLoading(false);
        } catch (e) {
            setError(e);
            setIsLoading(false);
        }
    };

    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData, error, isLoading };
};
