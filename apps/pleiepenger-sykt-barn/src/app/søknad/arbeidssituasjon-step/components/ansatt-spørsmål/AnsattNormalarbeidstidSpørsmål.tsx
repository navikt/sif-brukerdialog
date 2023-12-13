import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsforholdType } from '../../../../local-sif-common-pleiepenger';
import {
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
} from '../../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { getArbeidsforholdIntlValues } from '../../utils/arbeidsforholdIntlValues';
import { getArbeiderNormaltTimerIUkenValidator } from '../../validation/arbeiderNormaltTimerIUkenValidator';
import { InfoArbeiderNormaltTimerAnsatt } from '../info/InfoArbeiderNormaltTimerIUken';

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
            arbeidsgiverNavn: arbeidsforhold.arbeidsgiver.navn,
            type: ArbeidsforholdType.ANSATT,
        },
    });

    const erAktivtArbeidsforhold = arbeidsforhold.erAnsatt === YesOrNo.YES;
    return (
        <AnsattFormComponents.NumberInput
            label={intlHelper(intl, `arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`, intlValues)}
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
