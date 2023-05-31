import { ErrorSummary } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import ActionLink from '@navikt/sif-common-core-ds/lib/atoms/action-link/ActionLink';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { navigateToSoknadStep } from '../../../utils/navigationUtils';
import { getStepTexts } from '../../../utils/stepUtils';
import { ApiValidationError } from '../../../validation/apiValuesValidation';
import { StepConfigInterface } from '../../søknadStepsConfig';

interface Props {
    errors: ApiValidationError[];
    søknadStepConfig: StepConfigInterface;
}

const ApiValidationSummary: React.FunctionComponent<Props> = ({ errors, søknadStepConfig }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    if (errors.length === 0) {
        return null;
    }
    return (
        <FormBlock>
            <ErrorSummary heading={intlHelper(intl, 'formikValidationErrorSummary.tittel')}>
                {errors.map((error) => {
                    const stepTexts = getStepTexts(intl, error.stepId, søknadStepConfig);
                    return (
                        <>
                            <p>{error.feilmelding}</p>
                            <p>
                                <FormattedMessage id="steg.oppsummering.validering.navigasjonTilStegInfo" />
                            </p>
                            <ActionLink onClick={() => navigateToSoknadStep(error.stepId, navigate)}>
                                <FormattedMessage
                                    id="steg.oppsummering.validering.navigasjonTilStegGåTil"
                                    tagName="span"
                                />{' '}
                                &quot;
                                {stepTexts.stepTitle}&quot;
                            </ActionLink>
                        </>
                    );

                    // return <ErrorSummaryItem key={error.skjemaelementId}>{}</ErrorSummaryItem>;
                })}
            </ErrorSummary>
        </FormBlock>
    );
};

export default ApiValidationSummary;
