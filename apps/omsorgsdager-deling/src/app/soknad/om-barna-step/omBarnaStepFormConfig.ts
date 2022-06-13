import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { yesOrNoIsAnswered } from '@navikt/sif-common-core/lib/utils/yesOrNoUtils';
import { AnnetBarn } from '@navikt/sif-common-forms/lib/annet-barn/types';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { Barn, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { aldersBegrensingOver } from '../../utils/aldersUtils';

export enum OmBarnaFormStop {
    'ikkeAleneomsorgForOverføringOgFordeling' = 'ikkeAleneomsorgForOverføringOgFordeling',
    'alleBarnErOver12ogIngenUtvidetRett' = 'alleBarnErOver12ogIngenUtvidetRett',
}

const erAlleBarnOver12 = (barn: Barn[], andreBarn: AnnetBarn[]): boolean => {
    const kunBarnOver12iBarn = barn.filter((barnet) => aldersBegrensingOver(barnet.fødselsdato, 12)).length === 0;
    const kunBarnOver12iAndreBarn =
        andreBarn.filter((barnet) => aldersBegrensingOver(barnet.fødselsdato, 12)).length === 0;
    return kunBarnOver12iBarn && kunBarnOver12iAndreBarn;
};

export const getOmBarnaFormStop = (
    { gjelderMidlertidigPgaKorona, harAleneomsorg, andreBarn, harUtvidetRett }: SoknadFormData,
    barn: Barn[]
): OmBarnaFormStop | undefined => {
    if (gjelderMidlertidigPgaKorona === YesOrNo.NO && harAleneomsorg === YesOrNo.NO) {
        return OmBarnaFormStop.ikkeAleneomsorgForOverføringOgFordeling;
    }
    if (harUtvidetRett === YesOrNo.NO && erAlleBarnOver12(barn, andreBarn)) {
        return OmBarnaFormStop.alleBarnErOver12ogIngenUtvidetRett;
    }
    return undefined;
};

const Q = SoknadFormField;

export type OmBarnaFormQuestionsPayload = Partial<SoknadFormData> & {
    antallBarn: number;
    omBarnaStop: OmBarnaFormStop | undefined;
};

const OmBarnaFormConfig: QuestionConfig<OmBarnaFormQuestionsPayload, SoknadFormField> = {
    [Q.harAleneomsorg]: {
        isAnswered: ({ harAleneomsorg }): boolean => yesOrNoIsAnswered(harAleneomsorg),
    },
    [Q.harAleneomsorgFor]: {
        isAnswered: ({ harAleneomsorgFor }): boolean => harAleneomsorgFor !== undefined && harAleneomsorgFor.length > 0,
        isIncluded: ({ harAleneomsorg, antallBarn }): boolean => harAleneomsorg === YesOrNo.YES && antallBarn > 1,
    },
    [Q.harUtvidetRett]: {
        isAnswered: ({ harUtvidetRett }): boolean => yesOrNoIsAnswered(harUtvidetRett),
        isIncluded: ({ harAleneomsorg, omBarnaStop: stop }): boolean =>
            stop !== OmBarnaFormStop.ikkeAleneomsorgForOverføringOgFordeling && yesOrNoIsAnswered(harAleneomsorg),
    },
    [Q.harUtvidetRettFor]: {
        isAnswered: ({ harUtvidetRettFor }): boolean => harUtvidetRettFor !== undefined && harUtvidetRettFor.length > 0,
        isIncluded: ({ harUtvidetRett, antallBarn }): boolean => harUtvidetRett === YesOrNo.YES && antallBarn > 1,
    },
};

export const OmBarnaFormQuestions = Questions<OmBarnaFormQuestionsPayload, SoknadFormField>(OmBarnaFormConfig);
