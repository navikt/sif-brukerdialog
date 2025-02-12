import { Alert } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-validation';
import { AppText, useAppIntl } from '../../../../i18n';
import { Arbeidsforhold } from '../../../../types/ArbeidsforholdTypes';
import { AppFieldValidationErrors } from '../../../../utils/validations';
import { ArbeidsforholdFormFields } from '../SituasjonStep';

const { YesOrNoQuestion } = getTypedFormComponents<ArbeidsforholdFormFields, Arbeidsforhold, ValidationError>();

interface Props {
    arbeidsforhold: Arbeidsforhold;
    parentFieldName: string;
}

const ArbeidsforholdSituasjon: React.FC<Props> = ({ arbeidsforhold, parentFieldName }: Props) => {
    const { text } = useAppIntl();

    const getFieldName = (field: ArbeidsforholdFormFields) => `${parentFieldName}.${field}` as ArbeidsforholdFormFields;
    const arbeidsgivernavn = arbeidsforhold.navn;
    return (
        <>
            <FormBlock margin="none">
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
            </FormBlock>
            {arbeidsforhold[ArbeidsforholdFormFields.harHattFraværHosArbeidsgiver] === YesOrNo.YES && (
                <FormBlock>
                    <YesOrNoQuestion
                        legend={text(
                            'step.situasjon.arbeidsforhold.harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene.spm',
                        )}
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
                </FormBlock>
            )}
            {arbeidsforhold[ArbeidsforholdFormFields.harHattFraværHosArbeidsgiver] === YesOrNo.YES &&
                arbeidsforhold[ArbeidsforholdFormFields.arbeidsgiverHarUtbetaltLønn] === YesOrNo.YES && (
                    <Block margin="l">
                        <Alert variant="info">
                            <AppText id="step.situasjon.arbeidsforhold.harUtbetalingLønn.alertstripe" />
                        </Alert>
                    </Block>
                )}
        </>
    );
};

export default ArbeidsforholdSituasjon;
