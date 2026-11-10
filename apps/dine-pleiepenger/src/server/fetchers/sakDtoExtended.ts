import { innsyn } from '@sif/k9-sak-innsyn-api';
import { zBehandlingDto, zInnsendelserISakDto, zInnsending } from '@sif/k9-sak-innsyn-api/src/generated/innsyn';
import { z } from 'zod';

/**
 * Ytelse mangler i generert schema. Tar bare med feltene klienten bruker, slik at resten av
 * søknaden (bl.a. fnr for private arbeidsgivere) ikke sendes til nettleseren.
 * Feltene er valgfrie for at oppslaget ikke skal feile oftere enn før; klientskjemaet validerer innholdet.
 */
const zYtelseISak = z.object({
    type: z.string().optional(),
    arbeidstid: z
        .object({
            arbeidstakerList: z.array(z.object({ organisasjonsnummer: z.string().nullish() })).optional(),
        })
        .optional(),
});

export const zSakDtoExtended = innsyn.zSakDto.extend({
    // zSakDto har feil format i forhold til generert skjema; transformeres her
    fagsakYtelseType: z.union([
        innsyn.zSakDto.shape.fagsakYtelseType,
        z
            .object({
                kode: z.string(),
                kodeverk: z.string(),
            })
            .transform((val) => val.kode),
    ]),
    behandlinger: z.array(
        zBehandlingDto.extend({
            innsendelser: z.array(
                zInnsendelserISakDto.extend({
                    k9FormatInnsendelse: z
                        .optional(
                            zInnsending.extend({
                                // Ettersendelser har ytelse som streng, f.eks. "PLEIEPENGER_SYKT_BARN"
                                ytelse: z.union([zYtelseISak, z.string()]).optional(),
                            }),
                        )
                        .nullable(),
                }),
            ),
        }),
    ),
});

export type SakDtoExtended = z.infer<typeof zSakDtoExtended>;
