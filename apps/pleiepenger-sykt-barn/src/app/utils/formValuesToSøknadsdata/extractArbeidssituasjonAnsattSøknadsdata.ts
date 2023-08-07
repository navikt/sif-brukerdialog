import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFormValues } from '../../types/ArbeidsforholdFormValues';
import {
    ArbeidssituasjonAnsattSøknadsdata,
    ArbeidssituasjonAnsattType,
} from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { getPeriodeSomAnsattInnenforPeriode } from '../arbeidUtils';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractArbeidssituasjonAnsattSøknadsdata = (
    søknadsperiode: DateRange,
    alleAnsattArbeidsforhold: ArbeidsforholdFormValues[]
): ArbeidssituasjonAnsattSøknadsdata[] => {
    const arbeidssituasjoner: ArbeidssituasjonAnsattSøknadsdata[] = [];
    alleAnsattArbeidsforhold.forEach((values, index) => {
        if (values.erAnsatt === YesOrNo.NO && values.sluttetFørSøknadsperiode === YesOrNo.YES) {
            arbeidssituasjoner.push({
                type: ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode,
                index,
                arbeidsgiver: values.arbeidsgiver,
            });
        } else {
            const normalarbeidstid = extractNormalarbeidstid(values.normalarbeidstid);
            if (!normalarbeidstid) {
                throw 'extractArbeidssituasjonAnsattSøknadsdata: normalarbeidstid is undefined';
            }
            arbeidssituasjoner.push({
                type:
                    values.erAnsatt === YesOrNo.NO
                        ? ArbeidssituasjonAnsattType.sluttetISøknadsperiode
                        : ArbeidssituasjonAnsattType.pågående,
                index,
                normalarbeidstid,
                arbeidsgiver: values.arbeidsgiver,
                periodeSomAnsattISøknadsperiode: getPeriodeSomAnsattInnenforPeriode(
                    søknadsperiode,
                    values.arbeidsgiver
                ),
            });
        }
    });
    return arbeidssituasjoner;
};
