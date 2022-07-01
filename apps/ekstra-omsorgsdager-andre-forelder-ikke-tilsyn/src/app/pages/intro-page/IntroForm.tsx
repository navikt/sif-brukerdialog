import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getTypedFormComponents, UnansweredQuestionsInfo } from '@navikt/sif-common-formik';
import { QuestionVisibilityContext } from '@navikt/sif-common-soknad/lib/question-visibility/QuestionVisibilityContext';
import { IntroFormData, IntroFormField, introFormInitialValues, IntroFormQuestions } from './introFormConfig';
import IntroFormQuestion from './IntroFormQuestion';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { getYesOrNoValidator } from '@navikt/sif-common-formik/lib/validation';

interface Props {
    onValidSubmit: () => void;
}

const IntroFormComponents = getTypedFormComponents<IntroFormField, IntroFormData, ValidationError>();

const IntroForm = ({ onValidSubmit }: Props) => {
    const intl = useIntl();
    return (
        <IntroFormComponents.FormikWrapper
            initialValues={introFormInitialValues}
            onSubmit={() => {
                onValidSubmit();
            }}
            renderForm={({ values }) => {
                const visibility = IntroFormQuestions.getVisbility({
                    ...values,
                });
                const kanFortsette = visibility.areAllQuestionsAnswered();
                return (
                    <IntroFormComponents.Form
                        includeValidationSummary={true}
                        includeButtons={kanFortsette}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'introForm.validation')}
                        submitButtonLabel={intlHelper(intl, 'introForm.start')}
                        noButtonsContentRenderer={() =>
                            visibility.areAllQuestionsAnswered() ? undefined : (
                                <UnansweredQuestionsInfo>
                                    <FormattedMessage id="page.form.ubesvarteSpørsmålInfo" />
                                </UnansweredQuestionsInfo>
                            )
                        }>
                        <QuestionVisibilityContext.Provider value={{ visibility }}>
                            <IntroFormQuestion
                                name={IntroFormField.erAndreForelderenUtAvStandMinst6Måneder}
                                validate={getYesOrNoValidator()}
                                showStop={values.erAndreForelderenUtAvStandMinst6Måneder === YesOrNo.NO}
                                stopMessage={
                                    <>
                                        {intlHelper(
                                            intl,
                                            'introForm.erAndreForelderenUtAvStandMinst6Måneder.stopMessage'
                                        )}
                                    </>
                                }
                            />
                        </QuestionVisibilityContext.Provider>
                    </IntroFormComponents.Form>
                );
            }}
        />
    );
};

export default IntroForm;
