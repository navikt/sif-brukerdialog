import { useAppIntl } from '@i18n/index';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';

import { ArbeidsforholdType } from '../../../../../local-sif-common-pleiepenger';
import { ArbeidsforholdFrilanserFormValues } from '../../../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getArbeidsforholdIntlValues } from '../../../utils/arbeidsforholdIntlValues';
import { getArbeiderNormaltTimerIUkenValidator } from '../../../validation/arbeiderNormaltTimerIUkenValidator';
import { InfoArbeidetNormaltTimerFrilanserAvsluttet } from '../../info/InfoArbeiderNormaltTimerIUken';

interface Props {
    fieldName: FrilansFormField;
    arbeidsforhold: ArbeidsforholdFrilanserFormValues;
    inputTestId?: string;
}

const FormComponents = getTypedFormComponents<FrilansFormField, ArbeidsforholdFrilanserFormValues, ValidationError>();

const FrilansAvsluttetNormalarbeidstidSpørsmål = ({ fieldName, arbeidsforhold, inputTestId }: Props) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    const intlValues = getArbeidsforholdIntlValues(appIntl, {
        arbeidsforhold: {
            type: ArbeidsforholdType.FRILANSER,
        },
    });

    return (
        <FormComponents.NumberInput
            label={text(`arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`, {
                hvor: 'som frilanser',
                jobber: 'jobbet',
            })}
            data-testid={inputTestId}
            name={fieldName}
            description={<InfoArbeidetNormaltTimerFrilanserAvsluttet />}
            width="xs"
            validate={(value) => {
                return getArbeiderNormaltTimerIUkenValidator({
                    ...intlValues,
                    jobber: 'jobbet',
                })(value);
            }}
            maxLength={5}
            value={arbeidsforhold.normalarbeidstid ? arbeidsforhold.normalarbeidstid.timerPerUke || '' : ''}
        />
    );
};

export default FrilansAvsluttetNormalarbeidstidSpørsmål;
