// import { useState } from 'react';
// import { dateToISODate } from '@navikt/sif-common-utils';
// import { Deltakelse } from '@navikt/ung-common';
// import { EndrePeriodeDatoDto, zEndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api';
// import { ZodError } from 'zod';
// import { ApiError, handleApiError } from '@navikt/ung-common/src/api/errorHandlers';
// import { endreSluttdatoForDeltakelse } from '../api/deltakelse/endreSluttdatoForDeltakelse';
// import { endreStartdatoForDeltakelse } from '../api/deltakelse/endreStartdatoForDeltakelse';

// export const useEndreDeltakelse = (onDeltakelseEndret: (deltakelse: Deltakelse) => void) => {
//     const [pending, setPending] = useState<boolean>(false);
//     const [error, setError] = useState<ApiError | undefined>();

//     const handleEndreDato = async (
//         deltakelse: Deltakelse,
//         dato: Date,
//         endreDatoForDeltakelse: (id: string, dto: EndrePeriodeDatoDto) => Promise<Deltakelse>,
//     ) => {
//         setError(undefined);
//         setPending(true);
//         try {
//             const dto = zEndrePeriodeDatoDto.parse({
//                 dato: dateToISODate(dato),
//             });
//             const oppdatertDeltakelse = await endreDatoForDeltakelse(deltakelse.id, dto);
//             onDeltakelseEndret(oppdatertDeltakelse);
//         } catch (e) {
//             if (e instanceof ZodError) {
//                 setError(handleApiError(e, 'useEndreDeltakelse'));
//             } else {
//                 setError(e);
//             }
//         } finally {
//             setPending(false);
//         }
//     };

//     const endreStartdato = (deltakelse: Deltakelse, startdato: Date) => {
//         return handleEndreDato(deltakelse, startdato, endreStartdatoForDeltakelse);
//     };

//     const endreSluttdato = (deltakelse: Deltakelse, sluttdato: Date) => {
//         return handleEndreDato(deltakelse, sluttdato, endreSluttdatoForDeltakelse);
//     };

//     return {
//         pending,
//         error,
//         endreStartdato,
//         endreSluttdato,
//     };
// };
