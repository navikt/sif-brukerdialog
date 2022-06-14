import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { apiStringDateToDate } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { ApiBarn, BarnStepApiData } from '../../types/SoknadApiData';
import { Barn, SoknadFormData } from '../../types/SoknadFormData';
import { mapAnnetBarnToApiBarn, mapBarnToApiBarn } from './mapUtils';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

const sortBarnByFødseldsdato = (barn1: ApiBarn, barn2: ApiBarn): 1 | -1 => {
    if (dayjs(apiStringDateToDate(barn1.fødselsdato)).isSameOrBefore(apiStringDateToDate(barn2.fødselsdato))) {
        return -1;
    }
    return 1;
};

export const mapBarnStepToApiData = (
    { harAleneomsorg, harAleneomsorgFor, harUtvidetRett, harUtvidetRettFor, andreBarn }: SoknadFormData,
    registrerteBarn: Barn[]
): BarnStepApiData => {
    const barn: ApiBarn[] = [
        ...andreBarn.map((barn) => mapAnnetBarnToApiBarn(barn, harAleneomsorgFor, harUtvidetRettFor)),
        ...registrerteBarn.map((barn) => mapBarnToApiBarn(barn, harAleneomsorgFor, harUtvidetRettFor)),
    ];
    return {
        harAleneomsorg: harAleneomsorg === YesOrNo.YES,
        harUtvidetRett: harUtvidetRett === YesOrNo.YES,
        barn: barn.sort(sortBarnByFødseldsdato),
    };
};
