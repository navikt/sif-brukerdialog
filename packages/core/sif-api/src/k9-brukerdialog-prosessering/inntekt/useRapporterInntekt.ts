import { useMutation } from '@tanstack/react-query';

import { ApiError } from '../../shared/errorHandlers';
import { rapporterInntekt, YtelseInntektsrapportering } from './inntektApi';

export type { YtelseInntektsrapportering };

export const useRapporterInntekt = () =>
    useMutation<void, ApiError, YtelseInntektsrapportering>({ mutationFn: rapporterInntekt });
