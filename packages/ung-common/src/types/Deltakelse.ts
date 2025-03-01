import { ISODateToDate } from '@navikt/sif-common-utils';
import { hentAlleDeltakelserGittDeltakerIdResponseItem } from '@navikt/ung-deltakelse-opplyser';
import { z } from 'zod';
import { parseOppgaverDTO } from '../utils/parseOppgaverDTO';

export const deltakelseSchema = hentAlleDeltakelserGittDeltakerIdResponseItem
    .extend({
        id: z.string(),
    })
    .transform((data) => {
        return {
            ...data,
            fraOgMed: ISODateToDate(data.fraOgMed),
            tilOgMed: data.tilOgMed ? ISODateToDate(data.tilOgMed) : undefined,
            oppgaver: parseOppgaverDTO(data.oppgaver),
        };
    });

export const deltakelserSchema = z.array(deltakelseSchema);

export type Deltakelse = z.infer<typeof deltakelseSchema>;
