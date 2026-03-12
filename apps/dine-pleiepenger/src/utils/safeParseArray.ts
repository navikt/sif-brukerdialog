import type { ZodError, ZodType } from 'zod';

interface SafeParseArrayResult<T> {
    success: T[];
    errors: Array<{ index: number; error: ZodError }>;
}

export const safeParseArray = <T>(schema: ZodType<T>, data: unknown): SafeParseArrayResult<T> => {
    if (!Array.isArray(data)) {
        return { success: [], errors: [] };
    }

    const success: T[] = [];
    const errors: SafeParseArrayResult<T>['errors'] = [];

    data.forEach((item, index) => {
        const result = schema.safeParse(item);
        if (result.success) {
            success.push(result.data);
        } else {
            errors.push({ index, error: result.error });
        }
    });

    return { success, errors };
};
