import {
    getAttachmentId,
    getAttachmentBackendURL,
    getAttachmentFrontendURL,
    attachmentURLUtils,
} from '../attachmentURLUtils';
import { describe, expect, it } from 'vitest';

const ATTACHMENT_BACKEND_URL = 'https://k9-brukerdialog-prosessering';
const ATTACHMENT_FRONTEND_URL = 'https://k9-ettersending-soknad.intern.dev.nav.no/api';

describe('attachmentURLUtils', () => {
    const vedleggId =
        'eyJraWQiOiIxIiwiYWxnIjoibm9uZSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGVhZjM5ZC03OGJjLTQwZGEtYmEyNy1iNzAyNDA1MjQ5M2EifQ';
    const vedleggUrlFraResponseHeader = `http://k9-ettersending-soknad.intern.dev.nav.no/vedlegg/${vedleggId}`;

    it('henter ut ID fra url', () => {
        const result = getAttachmentId(vedleggUrlFraResponseHeader);
        expect(result).toEqual(
            'eyJraWQiOiIxIiwiYWxnIjoibm9uZSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGVhZjM5ZC03OGJjLTQwZGEtYmEyNy1iNzAyNDA1MjQ5M2EifQ',
        );
    });

    it('getAttachmentURLFrontend - genererer riktig frontend-url for et vedlegg', () => {
        const result = getAttachmentFrontendURL(vedleggUrlFraResponseHeader, ATTACHMENT_FRONTEND_URL);
        expect(result).toEqual(`https://k9-ettersending-soknad.intern.dev.nav.no/api/vedlegg/${vedleggId}`);
    });

    it('getAttachmentURLFrontend - setter inn /api dersom det er gammelt format og api ikke finnes i url', () => {
        const result = getAttachmentFrontendURL(vedleggUrlFraResponseHeader, ATTACHMENT_FRONTEND_URL);
        expect(result).toEqual(`https://k9-ettersending-soknad.intern.dev.nav.no/api/vedlegg/${vedleggId}`);
    });

    it('getAttachmentURLBackend - genererer riktig backend-url for et vedlegg', () => {
        const result = getAttachmentBackendURL(vedleggUrlFraResponseHeader, ATTACHMENT_BACKEND_URL);
        expect(result).toEqual(`https://k9-brukerdialog-prosessering/vedlegg/${vedleggId}`);
    });
    it('fixInvalidPathInFrontendURL - korrigerer ugyldig frontent url', () => {
        const invalidFrontendURL = `http://www.nav.no/vedlegg/${vedleggId}`;
        const result = attachmentURLUtils.fixInvalidPathInFrontendURL(invalidFrontendURL, ATTACHMENT_FRONTEND_URL);
        expect(result).toEqual(`https://k9-ettersending-soknad.intern.dev.nav.no/api/vedlegg/${vedleggId}`);
    });
});
