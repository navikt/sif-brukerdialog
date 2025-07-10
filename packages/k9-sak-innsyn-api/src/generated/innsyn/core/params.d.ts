type Slot = 'body' | 'headers' | 'path' | 'query';
export type Field = {
    in: Exclude<Slot, 'body'>;
    key: string;
    map?: string;
} | {
    in: Extract<Slot, 'body'>;
    key?: string;
    map?: string;
};
export interface Fields {
    allowExtra?: Partial<Record<Slot, boolean>>;
    args?: ReadonlyArray<Field>;
}
export type FieldsConfig = ReadonlyArray<Field | Fields>;
interface Params {
    body: unknown;
    headers: Record<string, unknown>;
    path: Record<string, unknown>;
    query: Record<string, unknown>;
}
export declare const buildClientParams: (args: ReadonlyArray<unknown>, fields: FieldsConfig) => Params;
export {};
//# sourceMappingURL=params.d.ts.map