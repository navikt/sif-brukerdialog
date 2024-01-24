import { useEffect, useLayoutEffect, useState } from 'react';
import debounce from 'lodash.debounce';

export const useElementDimensions = (
    ref: React.RefObject<HTMLElement>,
    listenToResize: boolean,
    debounceTimeout?: number,
) => {
    const [screenWidth, setScreenWidth] = useState<number>();
    const [dimensions, setDimensions] = useState<DOMRect>();

    const handleScreenResize = debounce(() => {
        setScreenWidth(window.innerWidth);
    }, debounceTimeout);

    useEffect(() => {
        if (!ref) {
            return;
        }
        if (listenToResize) {
            window.addEventListener('resize', handleScreenResize);
            return () => {
                window.removeEventListener('resize', handleScreenResize);
            };
        }
        return;
    }, [handleScreenResize, ref, listenToResize]);

    useLayoutEffect(() => {
        setDimensions(ref.current?.getBoundingClientRect());
    }, [screenWidth, ref]);

    return dimensions;
};
