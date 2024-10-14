import { useEffect, useState } from 'react';
import { useHasChanged } from '@navikt/sif-common/src/hooks';
import { StepID } from '../types/StepID';
import usePersistSoknad from './usePersistSoknad';

const DELAY_MS = 5000;

/** Lagrer hvert 5 sekund */

const usePersistOnChange = <T>(values: T, loaded: boolean, stepID: StepID) => {
    const { persistSoknad } = usePersistSoknad();
    const [timerId, setTimerId] = useState<any>();

    const delayedPersist = () => {
        persistSoknad({ stepID });
        setTimerId(undefined);
    };

    const requestPersist = () => {
        if (timerId) {
            window.clearTimeout(timerId);
        }
        const newTimerId = setTimeout(() => {
            delayedPersist();
        }, DELAY_MS);
        setTimerId(newTimerId);
    };

    useHasChanged(values, () => {
        if (loaded) {
            requestPersist();
        }
    });

    useEffect(() => {
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [timerId]);
};

export default usePersistOnChange;
