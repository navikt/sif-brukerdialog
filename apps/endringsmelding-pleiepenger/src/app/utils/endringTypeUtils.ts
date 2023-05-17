import { EndringType, SkalEndresMap } from '@types';

export const getValgteEndringer = (hvaSkalEndres: EndringType[]): SkalEndresMap => {
    return {
        arbeidstidSkalEndres: hvaSkalEndres.some((e) => e === EndringType.arbeidstid),
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
    };
};

export const getEndringerSomSkalGjøres = (
    hvaSkalEndres: EndringType[],
    harFjernetFerie: boolean,
    harUkjentArbeidsforholdMedRedusertArbeid: boolean
): SkalEndresMap => {
    return {
        arbeidstidSkalEndres:
            hvaSkalEndres.some((e) => e === EndringType.arbeidstid) ||
            harFjernetFerie ||
            harUkjentArbeidsforholdMedRedusertArbeid,
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
    };
};
