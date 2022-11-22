import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import StepButtonRow from '@navikt/sif-common-soknad-ds/lib/soknad-step/step-button-row/StepButtonRow';
import Step, { StepProps } from '../components/step/Step';
import { getStepConfig } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getStepTexts } from '../utils/stepUtils';
import ApplicationFormComponents from './ApplicationFormComponents';
import { useNavigate } from 'react-router-dom';

export interface FormikStepProps {
    children: React.ReactNode;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
    buttonDisabled?: boolean;
    onValidFormSubmit?: () => void;
    skipValidation?: boolean;
}

type Props = FormikStepProps & StepProps;

const ApplicationStep = (props: Props) => {
    const intl = useIntl();
    const { søknadstype } = React.useContext(ApplicationTypeContext);
    const navigateTo = useNavigate();

    useLogSidevisning(props.id);

    if (!søknadstype) {
        return <div>Søknadstype mangler</div>;
    }

    const { children, onValidFormSubmit, showButtonSpinner, buttonDisabled, id } = props;
    const stepConfig = getStepConfig(søknadstype);
    const step = stepConfig[id];
    const texts = getStepTexts(intl, id, stepConfig);
    const { backLinkHref } = step;
    return (
        <Step stepConfig={stepConfig} {...props} bannerTitle={intlHelper(intl, `banner.${søknadstype}`)}>
            <ApplicationFormComponents.Form
                onValidSubmit={onValidFormSubmit}
                includeButtons={false}
                includeValidationSummary={true}
                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                formFooter={
                    <FormBlock>
                        <StepButtonRow
                            backButton={
                                backLinkHref ? (
                                    <Button
                                        onClick={() => navigateTo(backLinkHref)}
                                        variant="tertiary"
                                        type="button"
                                        loading={showButtonSpinner}
                                        disabled={buttonDisabled || false}>
                                        {texts.previousButtonLabel}
                                    </Button>
                                ) : undefined
                            }
                            nextButton={
                                <Button
                                    variant="primary"
                                    type="submit"
                                    loading={showButtonSpinner}
                                    disabled={buttonDisabled || false}>
                                    {texts.nextButtonLabel}
                                </Button>
                            }
                        />
                    </FormBlock>
                }>
                {children}
            </ApplicationFormComponents.Form>
        </Step>
    );
};

export default ApplicationStep;
