export type KontoInfo = {
    harKontonummer: HarKontonummerEnum;
    kontonummerFraRegister?: string;
    formatertKontonummer?: string;
};

export enum HarKontonummerEnum {
    JA = 'JA',
    NEI = 'NEI',
    UVISST = 'UVISST',
}
