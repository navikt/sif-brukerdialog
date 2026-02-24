export const SENTRY_DSN = 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30';

export const SENTRY_IGNORE_ERRORS = [
    'TypeError: Failed to fetch',
    'TypeError: Load failed',
    'TypeError: NetworkError when attempting to fetch resource.',
    'TypeError: cancelled',
    'Request failed with status code 401',
    /\[401\]/,
    /\[0\]/,
];

export const maskUrlIds = (url: string): string => {
    return url
        .replace(/\/sak\/[^/]+/g, '/sak/[saksnr]')
        .replace(/\/inntektsmelding\/[^/]+/g, '/inntektsmelding/[journalpostId]');
};

export const isErrorFromDekoratoren = (frames: Array<{ filename?: string }>): boolean => {
    return frames.some((f) => (f.filename ?? '').includes('/dekoratoren/'));
};
