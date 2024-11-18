import { FileAccepted, FileRejected } from '@navikt/ds-react';
import { PersistedFile } from './PersistedFile';

export type Vedlegg = (Omit<FileRejected, 'file'> | Omit<FileAccepted, 'file'>) & {
    file: File | PersistedFile;
    uploaded?: boolean;
    pending?: boolean;
    canRetry?: boolean;
    info?: {
        id: string;
        url: string;
    };
};
