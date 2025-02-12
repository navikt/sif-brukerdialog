import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidsforholdFormValues } from '../../types/søknad-form-values/ArbeidsforholdFormValues';
import { ArbeidssituasjonAnsattType } from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { getPeriodeSomAnsattInnenforPeriode } from '../arbeidUtils';
import { getFeatureToggles } from '../featureToggleUtils';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractArbeidssituasjonAnsattSøknadsdata = (
    søknadsperiode: DateRange,
    alleAnsattArbeidsforhold: ArbeidsforholdFormValues[],
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
            const { spørOmSluttetISøknadsperiode } = getFeatureToggles();

            let type: ArbeidssituasjonAnsattType;
            if (spørOmSluttetISøknadsperiode) {
                type =
                    values.erAnsatt === YesOrNo.NO
                        ? ArbeidssituasjonAnsattType.sluttetISøknadsperiode
                        : ArbeidssituasjonAnsattType.pågående;
            } else {
                type =
                    values.erAnsatt === YesOrNo.NO
                        ? ArbeidssituasjonAnsattType.ikkeAnsattUkjentSluttdato
                        : ArbeidssituasjonAnsattType.pågående;
            }

            arbeidssituasjoner.set(values.arbeidsgiver.id, {
                type,
                index,
                normalarbeidstid,
                arbeidsgiver: values.arbeidsgiver,
                periodeSomAnsattISøknadsperiode: getPeriodeSomAnsattInnenforPeriode(
                    søknadsperiode,
                    values.arbeidsgiver,
                ),
            });
        }
    });
    return arbeidssituasjoner;
};
