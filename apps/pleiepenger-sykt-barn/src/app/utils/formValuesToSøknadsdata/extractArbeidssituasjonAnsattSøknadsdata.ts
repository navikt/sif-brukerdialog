import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFormValues } from '../../types/søknad-form-values/ArbeidsforholdFormValues';
import { ArbeidssituasjonAnsattType } from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { getPeriodeSomAnsattInnenforPeriode } from '../arbeidUtils';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractArbeidssituasjonAnsattSøknadsdata = (
    søknadsperiode: DateRange,
    alleAnsattArbeidsforhold: ArbeidsforholdFormValues[]
): ArbeidssituasjonArbeidsgivereSøknadsdata => {
    const arbeidssituasjoner: ArbeidssituasjonArbeidsgivereSøknadsdata = new Map();
    alleAnsattArbeidsforhold.forEach((values, index) => {
        if (values.erAnsatt === YesOrNo.NO && values.sluttetFørSøknadsperiode === YesOrNo.YES) {
            arbeidssituasjoner.set(values.arbeidsgiver.id, {
                type: ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode,
                index,
                arbeidsgiver: values.arbeidsgiver,
            });
        } else {
            const normalarbeidstid = extractNormalarbeidstid(values.normalarbeidstid);
            if (!normalarbeidstid) {
                return;
            }
            arbeidssituasjoner.set(values.arbeidsgiver.id, {
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
