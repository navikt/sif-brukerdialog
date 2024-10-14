import { useEffect } from 'react';
import { usePrevious } from '../../../sif-common/src/hooks';

export const useHasChanged = (value: any, callback: (value: any) => void) => {
    const previous = usePrevious(value);
    const hasChanged = previous !== value;
    useEffect(() => {
        if (hasChanged) {
            if (callback) {
                callback(previous);
            }
        }
    }, [callback, hasChanged, previous]);
    return [hasChanged, previous];
};
