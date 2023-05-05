import { EndringType, SkalEndresMap } from '../types/EndringType';

export const getValgteEndringer = (hvaSkalEndres: EndringType[]): SkalEndresMap => {
    return {
        arbeidstidSkalEndres: hvaSkalEndres.some((e) => e === EndringType.arbeidstid),
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
    };
};

export const getEndringerSomSkalGjøres = (
    hvaSkalEndres: EndringType[],
    harFjernetFerie: boolean,
    harNyArbeidsgiverMedRedusertArbeid: boolean
): SkalEndresMap => {
    return {
        arbeidstidSkalEndres:
            hvaSkalEndres.some((e) => e === EndringType.arbeidstid) ||
            harFjernetFerie ||
            harNyArbeidsgiverMedRedusertArbeid,
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
    };
};
