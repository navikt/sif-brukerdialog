import { DateRange } from '@navikt/sif-common-formik-ds';
import { useEffect, useState } from 'react';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { AxiosError } from 'axios';
import { appArbeidsgivereService } from '../api/appArbeidsgiverService';

interface LoadState {
    isLoading: boolean;
    isLoaded: boolean;
    error?: Error;
}

interface Props {
    periode?: DateRange;
}
export const useArbeidsgivereISøknadsperiode = ({ periode }: Props) => {
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: false, isLoaded: false });
    const [arbeidsgivereIPerioden, setArbeidsgivereIPerioden] = useState<Arbeidsgiver[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setLoadState({ isLoading: true, isLoaded: false });
            if (periode) {
                try {
                    const arbeidsgivere = await appArbeidsgivereService.fetch(periode);
                    setArbeidsgivereIPerioden(arbeidsgivere);
                    setLoadState({ isLoading: false, isLoaded: true, error: undefined });
                } catch (error) {
                    setLoadState({ isLoading: false, isLoaded: false, error: error as AxiosError });
                }
            }
        };
        fetch();
    }, [periode]);

    return {
        loadState,
        arbeidsgivereIPerioden,
    };
};
