import { ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { BrukerdialogOppgaveDto } from '@navikt/ung-brukerdialog-api';
import { zDeltakelseKomposittDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';
import { z } from 'zod';

import { parseOppgaverElement } from '../api/parse-utils/parseOppgaverElement';

export const deltakelsePeriodeSchema = zDeltakelseKomposittDto
    .extend({
        id: z.string(),
        oppgaver: z.array(z.custom<BrukerdialogOppgaveDto>()),
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
            erSlettet: data.erSlettet,
            harOpphørsvedtak: data.harOpphørsvedtak,
        };
    });

export const deltakelsePerioderSchema = z.array(deltakelsePeriodeSchema);

export type DeltakelsePeriode = z.infer<typeof deltakelsePeriodeSchema>;
