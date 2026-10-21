import { useMutation } from '@tanstack/react-query';

import { ApiError } from '../../shared/errorHandlers';
import { sendOppgavebekreftelse, YtelseOppgavebekreftelse } from './oppgavebekreftelseApi';

export type { YtelseOppgavebekreftelse };

export const useSendOppgavebekreftelse = () =>
    useMutation<void, ApiError, YtelseOppgavebekreftelse>({ mutationFn: sendOppgavebekreftelse });
