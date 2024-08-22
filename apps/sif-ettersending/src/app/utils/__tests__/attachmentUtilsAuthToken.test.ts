import { getAttachmentURLBackend, getAttachmentURLFrontend, getVedleggId } from '../attachmentUtilsAuthToken';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@navikt/sif-common-core-ds/src/utils/envUtils', () => {
    return {
        getEnvironmentVariable: (variable) => {
            switch (variable) {
                case 'VEDLEGG_API_URL':
                    return 'https://k9-brukerdialog-prosessering';
                case 'FRONTEND_VEDLEGG_URL':
                    return 'https://k9-ettersending-soknad.intern.dev.nav.no/api';
            }
        },
    };
});

describe('attachmentUtilsAuthToken', () => {
    const vedleggId =
        'eyJraWQiOiIxIiwiYWxnIjoibm9uZSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGVhZjM5ZC03OGJjLTQwZGEtYmEyNy1iNzAyNDA1MjQ5M2EifQ';
    const vedleggUrlFraResponseHeader = `http://k9-ettersending-soknad.intern.dev.nav.no/vedlegg/${vedleggId}`;

    it('henter ut ID fra url', () => {
        const result = getVedleggId(vedleggUrlFraResponseHeader);
        expect(result).toEqual(
            'eyJraWQiOiIxIiwiYWxnIjoibm9uZSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGVhZjM5ZC03OGJjLTQwZGEtYmEyNy1iNzAyNDA1MjQ5M2EifQ',
        );
    });

    it('getAttachmentURLFrontend - genererer riktig frontend-url for et vedlegg', () => {
        const result = getAttachmentURLFrontend(vedleggUrlFraResponseHeader);
        expect(result).toEqual(`https://k9-ettersending-soknad.intern.dev.nav.no/api/vedlegg/${vedleggId}`);
    });

    it('getAttachmentURLFrontend - setter inn /api dersom det er gammelt format og api ikke finnes i url', () => {
        const result = getAttachmentURLFrontend(vedleggUrlFraResponseHeader);
        expect(result).toEqual(`https://k9-ettersending-soknad.intern.dev.nav.no/api/vedlegg/${vedleggId}`);
    });

    it('getAttachmentURLBackend - genererer riktig backend-url for et vedlegg', () => {
        const result = getAttachmentURLBackend(vedleggUrlFraResponseHeader);
        expect(result).toEqual(`https://k9-brukerdialog-prosessering/vedlegg/${vedleggId}`);
    });
});
