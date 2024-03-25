import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export type Dokument = z.infer<typeof DokumentSchema>;

enum DokumentFiltype {
    PDF = 'PDF',
}

export enum DokumentDatoType {
    'DATO_OPPRETTET' = 'DATO_OPPRETTET',
    'DATO_DOKUMENT' = 'DATO_DOKUMENT',
    'DATO_JOURNALFOERT' = 'DATO_JOURNALFOERT',
    'DATO_REGISTRERT' = 'DATO_REGISTRERT',
}

export const DokumentSchema = z.object({
    journalpostId: z.string(),
    dokumentInfoId: z.string(),
    // saksnummer: z.string(),
    tittel: z.string(),
    filtype: z.nativeEnum(DokumentFiltype),
    harTilgang: z.boolean(),
    url: z.string(),
    relevanteDatoer: z.array(
        z.object({
            dato: z.preprocess(parseMaybeDateStringToDate, z.date()),
            datotype: z.nativeEnum(DokumentDatoType),
        }),
    ),
});
