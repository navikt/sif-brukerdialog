import { ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { OppgaveDto, zDeltakelseKomposittDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';
import { z } from 'zod';
import { parseOppgaverElement } from '../api/parse-utils/parseOppgaverElement';

export const deltakelsePeriodeSchema = zDeltakelseKomposittDto
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
            oppgaver: parseOppgaverElement(data.oppgaver as OppgaveDto[]), // Bruker as pga generert type ikke godtas
            søktTidspunkt: data.søktTidspunkt ? dayjs.utc(data.søktTidspunkt).toDate() : undefined,
        };
    });

export const deltakelsePerioderSchema = z.array(deltakelsePeriodeSchema);

export type DeltakelsePeriode = z.infer<typeof deltakelsePeriodeSchema>;
