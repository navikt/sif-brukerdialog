import { sendSøknad } from '@app/api/sendSoknad';
import { useSendSøknad } from '@app/hooks/useSendSoknad';
import { SøknadApiData } from '@app/types/SoknadApiData';
import { ApiError, ApiErrorType } from '@sif/api';
import { appLogger } from '@sif/apm';
import { useAnalyticsInstance, useSøknadSendt } from '@sif/soknad-app';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type MutationOptions = {
    mutationFn: (data: SøknadApiData) => Promise<void>;
    onSuccess: () => void;
    onError: (error: ApiError) => void;
};

const mocks = vi.hoisted(() => ({
    sendSøknad: vi.fn(),
    isApiAxiosError: vi.fn(),
    logSkjemaFeilet: vi.fn(),
    onSøknadSendt: vi.fn(),
    logError: vi.fn(),
    logApiError: vi.fn(),
    mutate: vi.fn(),
}));

vi.mock('@app/api/sendSoknad', () => ({ sendSøknad: mocks.sendSøknad }));
vi.mock('@sif/api', async (importOriginal) => ({
    ...(await importOriginal<typeof import('@sif/api')>()),
    isApiAxiosError: mocks.isApiAxiosError,
}));
vi.mock('@sif/apm', () => ({ appLogger: { logError: mocks.logError, logApiError: mocks.logApiError } }));
vi.mock('@sif/soknad-app', () => ({
    useAnalyticsInstance: () => ({ logSkjemaFeilet: mocks.logSkjemaFeilet }),
    useSøknadSendt: () => ({ onSøknadSendt: mocks.onSøknadSendt }),
}));

let mutationOptions: MutationOptions;
let mutationError: ApiError | null = null;

vi.mock('@tanstack/react-query', () => ({
    useMutation: vi.fn((options: MutationOptions) => {
        mutationOptions = options;
        return { mutate: mocks.mutate, isPending: false, error: mutationError };
    }),
}));

const søknad = {} as SøknadApiData;

describe('useSendSøknad', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mutationError = null;
    });

    it('sender søknaden og markerer den som sendt ved vellykket innsending', async () => {
        mocks.sendSøknad.mockResolvedValue(undefined);

        const { sendSøknad: send, sendSøknadError } = useSendSøknad();
        await mutationOptions.mutationFn(søknad);
        mutationOptions.onSuccess();

        expect(send).toBe(mocks.mutate);
        expect(sendSøknadError).toBeNull();
        expect(sendSøknad).toHaveBeenCalledWith(søknad);
        expect(useSøknadSendt().onSøknadSendt).toHaveBeenCalledOnce();
    });

    it('logger teknisk feilmelding ved request-valideringsfeil', () => {
        const error = { type: ApiErrorType.ZodValidationError, message: 'startdato: Invalid input' } as ApiError;
        useSendSøknad();

        mutationOptions.onError(error);

        expect(useAnalyticsInstance().logSkjemaFeilet).toHaveBeenCalledOnce();
        expect(appLogger.logError).toHaveBeenCalledWith(
            'sendSøknad: request-validering feilet for felt: startdato: Invalid input',
        );
    });

    it('logger opprinnelig feil ved API-feil og eksponerer mutation-feilen', () => {
        const originalError = new Error('Nettverksfeil');
        const error = { type: ApiErrorType.NetworkError, originalError } as ApiError;
        mutationError = error;
        mocks.isApiAxiosError.mockReturnValue(true);

        const { sendSøknadError } = useSendSøknad();
        mutationOptions.onError(error);

        expect(sendSøknadError).toBe(error);
        expect(appLogger.logApiError).toHaveBeenCalledWith(originalError, 'sendSøknad');
    });
});
