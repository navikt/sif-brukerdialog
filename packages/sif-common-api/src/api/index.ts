import {
    deleteVedlegg,
    fetchArbeidsgivere,
    fetchBarn,
    fetchSøker,
    getInnsendingService,
    getMellomlagringService,
    uploadVedlegg,
} from './services';

// export * from './apiClient';
export * from './k9BrukerdialogApiClient';
export * from './schemas';
export * from './services';
export * from './types';

export const commonApiService = {
    deleteVedlegg,
    fetchBarn,
    fetchArbeidsgivere,
    fetchSøker,
    getInnsendingService,
    getMellomlagringService,
    uploadVedlegg,
};
