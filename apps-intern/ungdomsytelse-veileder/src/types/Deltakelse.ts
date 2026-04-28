import { ISODateToDate } from '@navikt/sif-common-utils';
import { zDeltakelseDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import dayjs from 'dayjs';
import { z } from 'zod';

export const deltakelseSchema = zDeltakelseDto
    .extend({
        id: z.string(),
        harOpphørsvedtak: z.boolean().optional().default(false),
    })
    .transform((data) => {
        const fraOgMed = ISODateToDate(data.fraOgMed);
        const tilOgMed = data.tilOgMed ? ISODateToDate(data.tilOgMed) : undefined;

        const harOpphørsvedtak = data.harOpphørsvedtak ?? false;
        const maksDeltakelseDato = data.maksDeltakelseDato
            ? ISODateToDate(data.maksDeltakelseDato)
            : dayjs(fraOgMed).add(260, 'days').toDate();

        return {
            ...data,
            søktTidspunkt: data.søktTidspunkt ? dayjs.utc(data.søktTidspunkt).toDate() : undefined,
            fraOgMed,
            tilOgMed,
            harOpphørsvedtak,
            maksDeltakelseDato,
        };
    });

export const deltakelserSchema = z.array(deltakelseSchema);

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = Deltakelse[];
