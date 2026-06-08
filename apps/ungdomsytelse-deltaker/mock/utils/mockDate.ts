// Gjør __USE_FIXED_MOCKED_DATE__ valgfri for server-side
declare const __USE_FIXED_MOCKED_DATE__: boolean | undefined;

/**
 * Delt mock-dato som brukes overalt (både server og client)
 */
export const MOCK_DATE = '2025-08-01';

/**
 * Henter mock-dato basert på kontekst:
 * - I browser: bruker __USE_FIXED_MOCKED_DATE__ fra Vite config
 * - På server (MSW/Playwright): bruker alltid MOCK_DATE
 */
export const getMockToday = (): Date => {
    // Sjekk om vi er i browser og om Vite sin define er satt
    const useFixedDate =
        typeof window !== 'undefined' && typeof __USE_FIXED_MOCKED_DATE__ !== 'undefined'
            ? __USE_FIXED_MOCKED_DATE__
            : true; // Default til true på server for testing

    return useFixedDate ? new Date(MOCK_DATE) : new Date();
};
