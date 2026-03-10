import * as Sentry from '@sentry/nextjs';

type BreadcrumbCategory = 'api' | 'fetch' | 'navigation' | 'user' | 'system';

interface BreadcrumbOptions {
    category: BreadcrumbCategory;
    message: string;
    data?: Record<string, unknown>;
    level?: Sentry.SeverityLevel;
}

/**
 * Legger til en breadcrumb i Sentry for å spore hendelser før en feil oppstår.
 */
export const addBreadcrumb = ({ category, message, data, level = 'info' }: BreadcrumbOptions): void => {
    Sentry.addBreadcrumb({
        category,
        message,
        data,
        level,
        timestamp: Date.now() / 1000,
    });
};

/**
 * Wrapper for API-kall som automatisk legger til breadcrumbs.
 */
export const withApiBreadcrumb = async <T>(
    endpoint: string,
    operation: string,
    fn: () => Promise<T>,
    extraData?: Record<string, unknown>,
): Promise<T> => {
    addBreadcrumb({
        category: 'api',
        message: `${operation} - start`,
        data: { endpoint, ...extraData },
    });

    try {
        const result = await fn();
        addBreadcrumb({
            category: 'api',
            message: `${operation} - success`,
            data: { endpoint },
        });
        return result;
    } catch (error) {
        addBreadcrumb({
            category: 'api',
            message: `${operation} - failed`,
            data: {
                endpoint,
                error: error instanceof Error ? error.message : String(error),
            },
            level: 'error',
        });
        throw error;
    }
};
