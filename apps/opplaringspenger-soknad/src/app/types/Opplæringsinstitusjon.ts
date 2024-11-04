import { parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { z } from 'zod';

export const DateRangeSchema = z.object({
    from: z.date(),
    to: z.date(),
});

export const OpplæringsinstitusjonSchema = z
    .object({
        uuid: z.string(),
        navn: z.string(),
        perioder: z.array(
            z.object({
                fom: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
                tom: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
            }),
        ),
        ugyldigePerioder: z.array(DateRangeSchema),
    })
    .transform((data) => ({
        ...data,
        perioder: data.perioder.map(({ fom, tom }) => {
            return <DateRange>{
                from: fom,
                to: tom,
            };
        }),
    }));

export type Opplæringsinstitusjon = z.infer<typeof OpplæringsinstitusjonSchema>;
