import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ArbeidsforholdFormFields } from '../SituasjonStep';
import { Arbeidsforhold } from '../../../../types/ArbeidsforholdTypes';
import { ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Alert } from '@navikt/ds-react';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AppFieldValidationErrors } from '../../../../utils/validations';

const { YesOrNoQuestion } = getTypedFormComponents<ArbeidsforholdFormFields, Arbeidsforhold, ValidationError>();

interface Props {
    arbeidsforhold: Arbeidsforhold;
    parentFieldName: string;
}

const ArbeidsforholdSituasjon: React.FC<Props> = ({ arbeidsforhold, parentFieldName }: Props) => {
    const intl = useIntl();

    const getFieldName = (field: ArbeidsforholdFormFields) => `${parentFieldName}.${field}` as ArbeidsforholdFormFields;
    const arbeidsgivernavn = arbeidsforhold.navn;
    return (
        <>
            <FormBlock margin="none">
                <YesOrNoQuestion
                    legend={intlHelper(intl, 'step.situasjon.arbeidsforhold.harHattFravær.spm')}
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
                        legend={intlHelper(
                            intl,
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
                            <FormattedMessage id="step.situasjon.arbeidsforhold.harUtbetalingLønn.alertstripe" />
                        </Alert>
                    </Block>
                )}
        </>
    );
};

export default ArbeidsforholdSituasjon;
