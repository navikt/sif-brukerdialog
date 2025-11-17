import { innsyn } from '@navikt/k9-sak-innsyn-api';

/** Dokument */
export const dokumentClientSchema = innsyn.zDokumentDto.pick({
    dokumentInfoId: true,
    tittel: true,
    filtype: true,
    url: true,
});
