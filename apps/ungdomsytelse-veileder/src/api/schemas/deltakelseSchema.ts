import { z } from 'zod';
import { parseMaybeDateStringToDate } from '@navikt/sif-common-api/src/utils/jsonParseUtils';
import { dateRangeUtils } from '@navikt/sif-common-utils';
import { isBefore } from 'date-fns';
import { OpenDateRange } from '@navikt/sif-common-formik-ds';

const erDeltakelseAktiv = (harSøkt: boolean, fraOgMed: Date, tilOgMed: Date | undefined): boolean => {
    if (!harSøkt) {
        return false;
    }
    if (tilOgMed) {
        return dateRangeUtils.isDateInDateRange(new Date(), { from: fraOgMed, to: tilOgMed });
    }
    return isBefore(fraOgMed, new Date());
};

const erDeltakelseAvsluttet = (harSøkt: boolean, tilOgMed: Date | undefined): boolean => {
    if (!harSøkt) {
        return false;
    }
    if (!tilOgMed) {
        return false;
    }
    return isBefore(tilOgMed, new Date());
};

export const deltakelseSchema = z
    .object({
        id: z.string(),
        deltakerIdent: z.string(),
        deltaker: z.object({
            id: z.string(),
            deltakerIdent: z.string(),
        }),
        harSøkt: z.boolean(),
        fraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
        tilOgMed: z.preprocess(
            (val) => (val !== '' ? parseMaybeDateStringToDate(val) : null),
            z
                .date()
                .nullable()
                .optional()
                .transform((val) => (val === null ? undefined : val)),
        ),
    })
    .transform((data) => ({
        ...data,
        erAktiv: erDeltakelseAktiv(data.harSøkt, data.fraOgMed, data.tilOgMed),
        erAvsluttet: erDeltakelseAvsluttet(data.harSøkt, data.tilOgMed),
        periode: <OpenDateRange>{
            from: data.fraOgMed,
            to: data.tilOgMed,
        },
    }));
