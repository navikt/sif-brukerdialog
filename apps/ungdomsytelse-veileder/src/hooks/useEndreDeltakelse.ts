import { useState } from 'react';
import { dateToISODate } from '@navikt/sif-common-utils';
import { Deltakelse } from '@navikt/ung-common';
import { EndrePeriodeDatoDto, zEndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api';
import { ZodError } from 'zod';
import { ApiErrorObject, handleError } from '@navikt/ung-common/src/api/errorHandlers';
import { veilederApiService } from '../api/veilederApiService';

export const useEndreDeltakelse = (onDeltakelseEndret: (deltakelse: Deltakelse) => void) => {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<ApiErrorObject | undefined>();

    const handleEndreDato = async (
        deltakelse: Deltakelse,
        dato: Date,
        meldingFraVeileder: string | undefined,
        endreDatoForDeltakelse: (id: string, dto: EndrePeriodeDatoDto) => Promise<Deltakelse>,
    ) => {
        setError(undefined);
        setPending(true);
        try {
            const dto = zEndrePeriodeDatoDto.parse({
                dato: dateToISODate(dato),
                meldingFraVeileder: meldingFraVeileder,
                veilederRef: 'Navn Veiledersen [todo]',
            });
            const oppdatertDeltakelse = await endreDatoForDeltakelse(deltakelse.id, dto);
            onDeltakelseEndret(oppdatertDeltakelse);
        } catch (e) {
            if (e instanceof ZodError) {
                setError(handleError(e));
            } else {
                setError(e);
            }
        } finally {
            setPending(false);
        }
    };

    const endreStartdato = (deltakelse: Deltakelse, startdato: Date, meldingFraVeileder?: string) => {
        return handleEndreDato(
            deltakelse,
            startdato,
            meldingFraVeileder,
            veilederApiService.endreStartdatoForDeltakelse,
        );
    };

    const endreSluttdato = (deltakelse: Deltakelse, sluttdato: Date, meldingFraVeileder?: string) => {
        return handleEndreDato(
            deltakelse,
            sluttdato,
            meldingFraVeileder,
            veilederApiService.endreSluttdatoForDeltakelse,
        );
    };

    return {
        pending,
        error,
        endreStartdato,
        endreSluttdato,
    };
};
