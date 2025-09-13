import {
    deleteVedlegg,
    fetchArbeidsgivere,
    fetchBarn,
    fetchSøker,
    getInnsendingService,
    getMellomlagringService,
    uploadVedlegg,
} from './services';

export * from './schemas';
export * from './services';
export * from './types';
export * from './k9BrukerdialogApiClient';

export const commonApiService = {
    deleteVedlegg,
    fetchBarn,
    fetchArbeidsgivere,
    fetchSøker,
    getInnsendingService,
    getMellomlagringService,
    uploadVedlegg,
};
