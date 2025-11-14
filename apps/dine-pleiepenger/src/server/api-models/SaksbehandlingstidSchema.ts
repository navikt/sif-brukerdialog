import { zSaksbehandlingtidDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';

export type Saksbehandlingstid = {
    saksbehandlingstidUker: number;
};

export const SaksbehandlingstidSchema = zSaksbehandlingtidDto.transform((data) => ({
    saksbehandlingstidUker: Number(data.saksbehandlingstidUker),
}));
