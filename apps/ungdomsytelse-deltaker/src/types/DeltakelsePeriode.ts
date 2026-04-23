import { ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { zDeltakelseDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';
import { z } from 'zod';

export const deltakelsePeriodeSchema = zDeltakelseDto
    .extend({
        id: z.string(),
    })
    .transform((data) => {
        const { fraOgMed, tilOgMed, ...rest } = data;
        const programPeriode: OpenDateRange = {
            from: ISODateToDate(fraOgMed),
            to: tilOgMed ? ISODateToDate(tilOgMed) : undefined,
        };
        return {
            ...rest,
            programPeriode,
            søktTidspunkt: data.søktTidspunkt ? dayjs.utc(data.søktTidspunkt).toDate() : undefined,
            erSlettet: data.erSlettet,
            harOpphørsvedtak: data.harOpphørsvedtak,
        };
    });

export const deltakelsePerioderSchema = z.array(deltakelsePeriodeSchema);

export type DeltakelsePeriode = z.infer<typeof deltakelsePeriodeSchema>;
