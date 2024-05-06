import React from 'react';
import { useAppIntl } from '@i18n/index';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/src';
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
    const appIntl = useAppIntl();
    const { text } = appIntl;

    const intlValues = getArbeidsforholdIntlValues(appIntl, {
        arbeidsforhold: {
            arbeidsgiverNavn: arbeidsforhold.arbeidsgiver.navn,
            type: ArbeidsforholdType.ANSATT,
        },
    });

    const erAktivtArbeidsforhold = arbeidsforhold.erAnsatt === YesOrNo.YES;
    return (
        <AnsattFormComponents.NumberInput
            label={text(`arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`, intlValues)}
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
