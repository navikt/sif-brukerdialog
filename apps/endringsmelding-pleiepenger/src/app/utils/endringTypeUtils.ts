import { EndringType } from '../types/EndringType';

export const skalEndres = (hvaSkalEndres: EndringType[], type: EndringType): boolean => {
    return hvaSkalEndres.some((e) => e === type);
};
