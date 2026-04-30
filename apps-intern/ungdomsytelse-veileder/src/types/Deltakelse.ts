import { ISODateToDate } from '@navikt/sif-common-utils';
import { zDeltakelseDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import dayjs from 'dayjs';
import { z } from 'zod';

export const zDeltakelseStatus = z.object({
    erAvsluttet: z.boolean(),
    sisteDeltakelseDag: z.iso.date(),
});

export const deltakelseSchema = zDeltakelseDto
    .extend({
        id: z.string(),
    })
    .transform((data) => {
        const fraOgMed = ISODateToDate(data.fraOgMed);
        const tilOgMed = data.tilOgMed ? ISODateToDate(data.tilOgMed) : undefined;

        const harOpphørsvedtak = data.harOpphørsvedtak ?? false;
        const kvoteMaksDato = data.kvoteMaksDato
            ? ISODateToDate(data.kvoteMaksDato)
            : dayjs(fraOgMed).add(260, 'days').toDate();

        return {
            ...data,
            søktTidspunkt: data.søktTidspunkt ? dayjs.utc(data.søktTidspunkt).toDate() : undefined,
            fraOgMed,
            tilOgMed,
            harOpphørsvedtak,
            kvoteMaksDato,
        };
    });

export const deltakelserSchema = z.array(deltakelseSchema);

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = Deltakelse[];
