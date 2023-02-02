import { useEffect, useRef } from 'react';

const useEffectOnce = (callback?: () => void) => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (callback) {
            if (!hasRun.current) {
                callback();
                hasRun.current = true;
            }
        }
    }, [callback]);
};

export default useEffectOnce;
