import type { ApiError } from '@sif/api';
import { SifAlert } from '@sif/soknad-ui/components';
import { useEffect, useRef } from 'react';

export const InnsendingFeiletAlert = ({ error }: { error: ApiError }) => {
    const alertRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        alertRef.current?.focus();
    }, [error]);

    return (
        <SifAlert variant="error" ref={alertRef} tabIndex={-1}>
            {error.message}
        </SifAlert>
    );
};
