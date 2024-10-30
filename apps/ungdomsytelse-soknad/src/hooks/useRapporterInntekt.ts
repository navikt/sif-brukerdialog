import { DateRange } from '@navikt/sif-common-formik-ds';
import { useState } from 'react';
import { deltakerService } from '../api/services/deltakerService';
import { dateToISODate } from '@navikt/sif-common-utils';

export const useRapporterInntekt = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inntektLagret, setInntektLagret] = useState(false);

    const rapporterInntekt = async (deltakelseId: string, periode: DateRange, inntekt: number) => {
        setIsSubmitting(true);
        setInntektLagret(false);
        return await deltakerService
            .rapporterInntekt(deltakelseId, {
                fraOgMed: dateToISODate(periode.from),
                tilOgMed: dateToISODate(periode.to),
                inntekt: inntekt,
            })
            .then(() => {
                setIsSubmitting(false);
                setInntektLagret(true);
                return Promise.resolve();
            });
    };
    return {
        isSubmitting,
        inntektLagret,
        rapporterInntekt,
        resetInntektLagret: () => setInntektLagret(false),
    };
};
