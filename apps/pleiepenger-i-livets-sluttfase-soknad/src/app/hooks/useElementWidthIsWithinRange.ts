import { useEffect, useState } from 'react';
import { useElementDimensions } from './useElementDimensions';

export interface Range {
    min: number;
    max: number;
}

const isWidthInRange = (width: number | undefined, range: Range) => {
    if (!width) {
        return false;
    }
    return width <= range.max && width >= range.min;
};

export const useElementWidthIsWithinRange = (
    ref: React.RefObject<HTMLElement | null>,
    range: Range,
    debounceTimeout?: number,
) => {
    const dimensions = useElementDimensions(ref, true, debounceTimeout);
    const [isWithin, setIsWithin] = useState<boolean>(isWidthInRange(dimensions?.width, range));
    useEffect(() => {
        const r = isWidthInRange(dimensions?.width, range);
        if (r !== isWithin) {
            setIsWithin(r);
        }
    }, [dimensions, isWithin, range]);

    return isWithin;
};
