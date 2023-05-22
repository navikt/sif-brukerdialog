import { Arbeidsforhold, EndringType, SkalEndresMap } from '@types';

export const getValgteEndringer = (hvaSkalEndres: EndringType[]): SkalEndresMap => {
    return {
        arbeidstidSkalEndres: hvaSkalEndres.some((e) => e === EndringType.arbeidstid),
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
    };
};

export const getEndringerSomSkalGjøres = (
    hvaSkalEndres: EndringType[],
    harFjernetFerie: boolean,
    ukjentArbeidsforhold?: Arbeidsforhold[]
): SkalEndresMap => {
    return {
        arbeidstidSkalEndres:
            hvaSkalEndres.some((e) => e === EndringType.arbeidstid) ||
            harFjernetFerie ||
            (ukjentArbeidsforhold !== undefined && ukjentArbeidsforhold.some((a) => a.erAnsatt === true)),
        lovbestemtFerieSkalEndres: hvaSkalEndres.some((e) => e === EndringType.lovbestemtFerie),
    };
};
