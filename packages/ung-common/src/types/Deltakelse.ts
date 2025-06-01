import { ISODateToDate } from '@navikt/sif-common-utils';
import { OppgaveDto, zDeltakelseOpplysningDto } from '@navikt/ung-deltakelse-opplyser-api';
import { z } from 'zod';
import { parseOppgaverElement } from '../api/parse-utils/parseOppgaverElement';

export const deltakelseSchema = zDeltakelseOpplysningDto
    .extend({
        id: z.string(),
    })
    .transform((data) => {
        const fraOgMed = ISODateToDate(data.fraOgMed);
        const tilOgMed = data.tilOgMed ? ISODateToDate(data.tilOgMed) : undefined;
        return {
            ...data,
            fraOgMed,
            tilOgMed,
            oppgaver: parseOppgaverElement(data.oppgaver as OppgaveDto[]), // Bruker as pga generert type ikke godtas
        };
    });

export const deltakelserSchema = z.array(deltakelseSchema);

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = Deltakelse[];
