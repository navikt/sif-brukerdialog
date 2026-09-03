import { zDeltakelseDto, zDeltakelseStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { ISODate, OpenDateRange } from '@sif/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';
dayjs.extend(utc);

export const deltakelsePeriodeSchema = zDeltakelseDto
    .extend({
        id: z.string(),
    })
    .omit({ kvoteMaksDato: true, harUtvidetKvote: true })
    .transform((data) => {
        const { fraOgMed, tilOgMed, periodeMaksDato, forlengetPeriodeMaksDato, ...rest } = data;
        const programPeriode: OpenDateRange = {
            from: fraOgMed as ISODate,
            to: tilOgMed ? (tilOgMed as ISODate) : undefined,
        };
        return {
            ...rest,
            programPeriode,
            periodeMaksDato: periodeMaksDato as ISODate,
            forlengetPeriodeMaksDato: forlengetPeriodeMaksDato as ISODate,
            søktTidspunkt: data.søktTidspunkt ? dayjs.utc(data.søktTidspunkt).toDate() : undefined,
            erSlettet: data.erSlettet,
            harOpphørsvedtak: data.harOpphørsvedtak,
        };
    });

export const deltakelsePerioderSchema = z.array(deltakelsePeriodeSchema);

export type DeltakelseStatus = z.infer<typeof zDeltakelseStatus>;
export type DeltakelsePeriode = z.infer<typeof deltakelsePeriodeSchema>;
