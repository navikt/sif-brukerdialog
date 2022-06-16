import { useCallback, useEffect } from 'react';
import { useAmplitudeInstance } from '../amplitude';

function useLogSidevisning<PageKeys extends string>(pageKey: PageKeys) {
    const { logSidevisning } = useAmplitudeInstance();
    const logPage = useCallback(
        (key: PageKeys) => {
            logSidevisning(key);
        },
        [logSidevisning]
    );

    useEffect(() => {
        logPage(pageKey);
    }, [pageKey, logPage]);
}

export default useLogSidevisning;
