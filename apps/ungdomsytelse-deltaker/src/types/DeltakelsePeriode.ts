import { zDeltakelseDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { ISODate, OpenDateRange } from '@sif/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';
dayjs.extend(utc);

/** Legges til manuelt frem til codegen blir oppdatert */
export const zDeltakelseStatus = z.enum(['IKKE_STARTET', 'AKTIV', 'IKKE_AKTIV']);

export const deltakelsePeriodeSchema = zDeltakelseDto
    .extend({
        id: z.string(),
        status: zDeltakelseStatus,
    })
    .omit({ kvoteMaksDato: true, harUtvidetKvote: true })
    .transform((data) => {
        const { fraOgMed, tilOgMed, ...rest } = data;
        const programPeriode: OpenDateRange = {
            from: fraOgMed as ISODate,
            to: tilOgMed ? (tilOgMed as ISODate) : undefined,
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

export type DeltakelseStatus = z.infer<typeof zDeltakelseStatus>;
export type DeltakelsePeriode = z.infer<typeof deltakelsePeriodeSchema>;
