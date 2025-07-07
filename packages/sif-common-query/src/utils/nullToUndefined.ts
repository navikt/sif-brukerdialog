/**
 * Recursively transforms null values to undefined in an object
 * This is needed because backend returns null for optional fields,
 * but Zod expects undefined for optional fields
 * 
 * @param obj The object to transform
 * @returns The object with null values converted to undefined
 */
export const nullToUndefined = <T>(obj: T): T => {
    if (obj === null) {
        return undefined as unknown as T;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(nullToUndefined) as unknown as T;
    }
    
    if (typeof obj === 'object' && obj !== null) {
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = nullToUndefined(value);
        }
        return result as T;
    }
    
    return obj;
};
