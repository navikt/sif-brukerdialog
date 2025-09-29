import { useAppIntl } from '@i18n/index';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';

import { ArbeidsforholdType } from '../../../../../local-sif-common-pleiepenger';
import { ArbeidsforholdFrilanserFormValues } from '../../../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { FrilansFormField, Frilanstype } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getArbeidsforholdIntlValues } from '../../../utils/arbeidsforholdIntlValues';
import {
    getArbeiderNormaltTimerFrilanserIUkenValidator,
    getArbeiderNormaltTimerIUkenValidator,
} from '../../../validation/arbeiderNormaltTimerIUkenValidator';
import { InfoArbeiderNormaltTimerFrilanser } from '../../info/InfoArbeiderNormaltTimerIUken';

interface Props {
    fieldName: FrilansFormField;
    arbeidsforhold: ArbeidsforholdFrilanserFormValues;
    erAktivtArbeidsforhold: boolean;
    frilanstype: Frilanstype;
    misterHonorar?: YesOrNo;
    mottarOmsorgsstønad?: boolean;
    inputTestId?: string;
    timerOmsorgsstønad?: number;
}

const FormComponents = getTypedFormComponents<FrilansFormField, ArbeidsforholdFrilanserFormValues, ValidationError>();

const FrilansNormalarbeidstidSpørsmål = ({
    fieldName,
    erAktivtArbeidsforhold,
    frilanstype,
    arbeidsforhold,
    mottarOmsorgsstønad,
    inputTestId,
    timerOmsorgsstønad,
}: Props) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    const intlValues = getArbeidsforholdIntlValues(appIntl, {
        arbeidsforhold: {
            type: ArbeidsforholdType.FRILANSER,
        },
    });

    const tekstOmsorgsstønad = text('arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.infoOmsorgsstønad');
    return (
        <FormComponents.NumberInput
            label={text(`arbeidsforhold.arbeiderNormaltTimerPerUke.snitt.spm`, {
                infoOmsorgsstønad: mottarOmsorgsstønad ? tekstOmsorgsstønad : '',
                hvor: 'som frilanser',
                jobber: erAktivtArbeidsforhold ? 'jobber' : 'jobbet',
                bruker: erAktivtArbeidsforhold ? 'bruker' : 'brukte',
            })}
            data-testid={inputTestId}
            name={fieldName}
            description={
                <InfoArbeiderNormaltTimerFrilanser
                    frilanstype={frilanstype}
                    mottarOmsorgsstønadFosterhjemsgodtgjørelse={mottarOmsorgsstønad}
                />
            }
            width="xs"
            validate={(value) => {
                return timerOmsorgsstønad
                    ? getArbeiderNormaltTimerFrilanserIUkenValidator({
                          ...intlValues,
                          jobber: erAktivtArbeidsforhold ? 'jobber' : 'jobbet',
                      })(value, timerOmsorgsstønad)
                    : getArbeiderNormaltTimerIUkenValidator({
                          ...intlValues,
                          jobber: erAktivtArbeidsforhold ? 'jobber' : 'jobbet',
                      })(value);
            }}
            maxLength={5}
            value={arbeidsforhold.normalarbeidstid ? arbeidsforhold.normalarbeidstid.timerPerUke || '' : ''}
        />
    );
};

export default FrilansNormalarbeidstidSpørsmål;
