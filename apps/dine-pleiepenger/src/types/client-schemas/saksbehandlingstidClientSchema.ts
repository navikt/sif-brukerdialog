import { innsyn } from '@navikt/k9-sak-innsyn-api';

export const saksbehandlingstidClientSchema = innsyn.zSaksbehandlingtidDto.transform((data) => ({
    saksbehandlingstidUker: Number(data.saksbehandlingstidUker),
}));
