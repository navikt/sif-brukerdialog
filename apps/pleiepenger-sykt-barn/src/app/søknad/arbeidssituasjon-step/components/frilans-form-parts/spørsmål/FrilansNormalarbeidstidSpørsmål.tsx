import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { ArbeidsforholdType } from '../../../../../local-sif-common-pleiepenger';
import { ArbeidsforholdFrilanserFormValues } from '../../../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { FrilansFormField, Frilanstype } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getArbeidsforholdIntlValues } from '../../../utils/arbeidsforholdIntlValues';
import { getArbeiderNormaltTimerIUkenValidator } from '../../../validation/arbeiderNormaltTimerIUkenValidator';
import { InfoArbeiderNormaltTimerFrilanser } from '../../info/InfoArbeiderNormaltTimerIUken';

interface Props {
    fieldName: FrilansFormField;
    arbeidsforhold: ArbeidsforholdFrilanserFormValues;
    erAktivtArbeidsforhold: boolean;
    frilanstype: Frilanstype;
    misterHonorar?: YesOrNo;
    mottarStønadGodtgjørelse?: boolean;
    inputTestId?: string;
}

const FormComponents = getTypedFormComponents<FrilansFormField, ArbeidsforholdFrilanserFormValues, ValidationError>();

const FrilansNormalarbeidstidSpørsmål: React.FunctionComponent<Props> = ({
    fieldName,
    erAktivtArbeidsforhold,
    frilanstype,
    arbeidsforhold,
    mottarStønadGodtgjørelse,
    inputTestId,
}) => {
    const intl = useIntl();
    const intlValues = getArbeidsforholdIntlValues(intl, {
        arbeidsforhold: {
            type: ArbeidsforholdType.FRILANSER,
        },
    });

    const tekstStønadGodtgjørelse = intlHelper(
        intl,
        'arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.infoStønadGodtgjørelse',
    );
    return (
        <FormComponents.NumberInput
            label={intlHelper(intl, `arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`, {
                infoStønadGodtgjørelse: mottarStønadGodtgjørelse ? tekstStønadGodtgjørelse : '',
                hvor: 'som frilanser',
                jobber: erAktivtArbeidsforhold ? 'jobber' : 'jobbet',
                bruker: erAktivtArbeidsforhold ? 'bruker' : 'brukte',
            })}
            data-testid={inputTestId}
            name={fieldName}
            description={
                <InfoArbeiderNormaltTimerFrilanser
                    frilanstype={frilanstype}
                    mottarOmsorgsstønadFosterhjemsgodtgjørelse={mottarStønadGodtgjørelse}
                />
            }
            width="xs"
            validate={getArbeiderNormaltTimerIUkenValidator({
                ...intlValues,
                jobber: erAktivtArbeidsforhold ? 'jobber' : 'jobbet',
            })}
            value={arbeidsforhold.normalarbeidstid ? arbeidsforhold.normalarbeidstid.timerPerUke || '' : ''}
        />
    );
};

export default FrilansNormalarbeidstidSpørsmål;
