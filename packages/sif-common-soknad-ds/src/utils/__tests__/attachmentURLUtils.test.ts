import { getAttachmentId } from '../attachmentURLUtils';
import { describe, expect, it } from 'vitest';

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
});
