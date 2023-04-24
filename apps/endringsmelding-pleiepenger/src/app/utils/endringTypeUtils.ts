import { EndringType, SkalEndresMap } from '../types/EndringType';

export const getValgteEndringer = (hvaSkalEndres: EndringType[]): SkalEndresMap => {
    return {
        arbeidstidSkalEndres: hvaSkalEndres.some((e) => e === EndringType.arbeidstid),
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
        utenlandsoppholdSkalEndres: hvaSkalEndres.some((e) => e === EndringType.utenlandsopphold),
    };
};

export const getEndringerSomSkalGjøres = (hvaSkalEndres: EndringType[], harFjernetFerie: boolean): SkalEndresMap => {
    return {
        arbeidstidSkalEndres: hvaSkalEndres.some((e) => e === EndringType.arbeidstid) || harFjernetFerie,
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
        utenlandsoppholdSkalEndres: hvaSkalEndres.some((e) => e === EndringType.utenlandsopphold),
    };
};
