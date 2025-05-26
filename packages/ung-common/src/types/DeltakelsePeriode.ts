import { ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { zDeltakelsePeriodInfo } from '@navikt/ung-deltakelse-opplyser-api';
import { z } from 'zod';
import { parseOppgaverElement } from '../api';
import dayjs from 'dayjs';

export const deltakelsePeriodeSchema = zDeltakelsePeriodInfo
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
            oppgaver: parseOppgaverElement(data.oppgaver),
            søktTidspunkt: data.søktTidspunkt ? dayjs.utc(data.søktTidspunkt).toDate() : undefined,
        };
    });

export const deltakelsePerioderSchema = z.array(deltakelsePeriodeSchema);

export type DeltakelsePeriode = z.infer<typeof deltakelsePeriodeSchema>;
