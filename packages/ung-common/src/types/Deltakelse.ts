import { ISODateToDate } from '@navikt/sif-common-utils';
import { zDeltakelseOpplysningDto } from '@navikt/ung-deltakelse-opplyser-api';
import { z } from 'zod';
import { parseOppgaverElement } from '../utils/parseOppgaverElement';

export const deltakelseSchema = zDeltakelseOpplysningDto
    .extend({
        id: z.string(),
    })
    .transform((data) => {
        return {
            ...data,
            fraOgMed: ISODateToDate(data.fraOgMed),
            tilOgMed: data.tilOgMed ? ISODateToDate(data.tilOgMed) : undefined,
            oppgaver: parseOppgaverElement(data.oppgaver),
        };
    });

export const deltakelserSchema = z.array(deltakelseSchema);

export type Deltakelse = z.infer<typeof deltakelseSchema>;
