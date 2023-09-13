import { useEffect } from 'react';
import { usePrevious } from './usePrevious';

export const useHasChanged = (value: any, callback: (value: any) => void) => {
    const previous = usePrevious(value);
    const hasChanged = previous !== value;

    useEffect(() => {
        if (hasChanged) {
            callback && callback(previous);
        }
    }, [callback, hasChanged, previous]);
    return [hasChanged, previous];
};
