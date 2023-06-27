import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsforholdFormField, ArbeidsforholdFormValues } from '../../../../types/ArbeidsforholdFormValues';
import { getArbeidsforholdIntlValues } from '../../utils/arbeidsforholdIntlValues';
import { ArbeidsforholdType } from '../../../../local-sif-common-pleiepenger';
import { InfoArbeiderNormaltTimerAnsatt } from '../info/InfoArbeiderNormaltTimerIUken';
import { getArbeiderNormaltTimerIUkenValidator } from '../../validation/arbeiderNormaltTimerIUkenValidator';

const AnsattFormComponents = getTypedFormComponents<
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
    ValidationError
>();

interface Props {
    arbeidsforhold: ArbeidsforholdFormValues;
    fieldName: ArbeidsforholdFormField;
}

const AnsattNormalarbeidstidSpørsmål: React.FunctionComponent<Props> = ({ arbeidsforhold, fieldName }) => {
    const intl = useIntl();

    const intlValues = getArbeidsforholdIntlValues(intl, {
        arbeidsforhold: {
            arbeidsstedNavn: arbeidsforhold.arbeidsgiver.navn,
            type: ArbeidsforholdType.ANSATT,
        },
    });

    const erAktivtArbeidsforhold = arbeidsforhold.erAnsatt === YesOrNo.YES;
    return (
        <AnsattFormComponents.NumberInput
            label={intlHelper(
                intl,
                erAktivtArbeidsforhold
                    ? `arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.avsluttet.spm`
                    : `arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`,
                intlValues
            )}
            name={fieldName}
            description={<InfoArbeiderNormaltTimerAnsatt />}
            width="xs"
            validate={getArbeiderNormaltTimerIUkenValidator({
                ...intlValues,
                jobber: erAktivtArbeidsforhold ? 'jobber' : 'jobbet',
            })}
            value={arbeidsforhold.normalarbeidstid ? arbeidsforhold.normalarbeidstid.timerPerUke || '' : ''}
        />
    );
};

export default AnsattNormalarbeidstidSpørsmål;
