import { ISODate } from '@navikt/sif-common-utils';

export interface HentSisteGyldigeVedtakResponseDto {
    harInnvilgedeBehandlinger: boolean;
    saksnummer: string | null;
    vedtaksdato: ISODate | null;
    førsteMuligeSøknadsdato: ISODate | null;
    vedtakTomDato: ISODate | null;
}
