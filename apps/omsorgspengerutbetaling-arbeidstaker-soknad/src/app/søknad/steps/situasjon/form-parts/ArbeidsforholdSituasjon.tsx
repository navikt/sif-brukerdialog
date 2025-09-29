import { Alert } from '@navikt/ds-react';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';

import { AppText, useAppIntl } from '../../../../i18n';
import { Arbeidsforhold } from '../../../../types/ArbeidsforholdTypes';
import { AppFieldValidationErrors } from '../../../../utils/validations';
import { ArbeidsforholdFormFields } from '../SituasjonStep';

const { YesOrNoQuestion } = getTypedFormComponents<ArbeidsforholdFormFields, Arbeidsforhold, ValidationError>();

interface Props {
    arbeidsforhold: Arbeidsforhold;
    parentFieldName: string;
}

const ArbeidsforholdSituasjon = ({ arbeidsforhold, parentFieldName }: Props) => {
    const { text } = useAppIntl();

    const getFieldName = (field: ArbeidsforholdFormFields) => `${parentFieldName}.${field}` as ArbeidsforholdFormFields;
    const arbeidsgivernavn = arbeidsforhold.navn;
    return (
        <>
            <YesOrNoQuestion
                legend={text('step.situasjon.arbeidsforhold.harHattFravær.spm')}
                name={getFieldName(ArbeidsforholdFormFields.harHattFraværHosArbeidsgiver)}
                validate={(value) => {
                    return getYesOrNoValidator()(value)
                        ? {
                              key: AppFieldValidationErrors.harHattFraværHosArbeidsgiver_yesOrNoIsUnanswered,
                              values: { arbeidsgivernavn },
                              keepKeyUnaltered: true,
                          }
                        : undefined;
                }}
                data-testid="arbeidsforhold-harHattFravær"
            />

            {arbeidsforhold[ArbeidsforholdFormFields.harHattFraværHosArbeidsgiver] === YesOrNo.YES && (
                <YesOrNoQuestion
                    legend={text('step.situasjon.arbeidsforhold.harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene.spm')}
                    name={getFieldName(ArbeidsforholdFormFields.arbeidsgiverHarUtbetaltLønn)}
                    validate={(value) => {
                        return getYesOrNoValidator()(value)
                            ? {
                                  key: AppFieldValidationErrors.arbeidsgiverHarUtbetaltLønn_yesOrNoIsUnanswered,
                                  values: { arbeidsgivernavn },
                                  keepKeyUnaltered: true,
                              }
                            : undefined;
                    }}
                    data-testid="arbeidsforhold-harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene"
                />
            )}
            {arbeidsforhold[ArbeidsforholdFormFields.harHattFraværHosArbeidsgiver] === YesOrNo.YES &&
                arbeidsforhold[ArbeidsforholdFormFields.arbeidsgiverHarUtbetaltLønn] === YesOrNo.YES && (
                    <FormLayout.QuestionRelatedMessage>
                        <Alert variant="info">
                            <AppText id="step.situasjon.arbeidsforhold.harUtbetalingLønn.alertstripe" />
                        </Alert>
                    </FormLayout.QuestionRelatedMessage>
                )}
        </>
    );
};

export default ArbeidsforholdSituasjon;
