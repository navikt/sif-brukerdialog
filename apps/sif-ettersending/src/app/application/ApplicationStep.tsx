import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import Step, { StepProps } from '../components/step/Step';
import { getStepConfig } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getStepTexts } from '../utils/stepUtils';
import ApplicationFormComponents from './ApplicationFormComponents';

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

    useLogSidevisning(props.id);

    if (!søknadstype) {
        return <div>Søknadstype mangler</div>;
    }

    const { children, onValidFormSubmit, showButtonSpinner, buttonDisabled, id } = props;
    const stepConfig = getStepConfig(søknadstype);
    const texts = getStepTexts(intl, id, stepConfig);
    return (
        <Step stepConfig={stepConfig} {...props} bannerTitle={intlHelper(intl, `banner.${søknadstype}`)}>
            <ApplicationFormComponents.Form
                onValidSubmit={onValidFormSubmit}
                includeButtons={false}
                includeValidationSummary={true}
                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                formFooter={
                    <div className="text-center">
                        <FormBlock>
                            <Button
                                variant="primary"
                                type="submit"
                                loading={showButtonSpinner}
                                disabled={buttonDisabled || false}>
                                {texts.nextButtonLabel}
                            </Button>
                        </FormBlock>
                    </div>
                }>
                {children}
            </ApplicationFormComponents.Form>
        </Step>
    );
};

export default ApplicationStep;
