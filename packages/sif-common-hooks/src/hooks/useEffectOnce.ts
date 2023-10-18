import { useEffect, useState } from 'react';

export const useEffectOnce = (callback?: () => void) => {
    const [hasRun, setHasRun] = useState(false);
    useEffect(() => {
        if (callback) {
            if (!hasRun) {
                callback();
                setHasRun(true);
            }
        }
    }, [hasRun, callback]);
};
