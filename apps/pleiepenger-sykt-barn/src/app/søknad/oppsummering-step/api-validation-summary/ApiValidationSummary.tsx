import { BodyLong, ErrorSummary } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { StepID } from '../../../types/StepID';
import { ApiValidationError } from '../../../validation/apiValuesValidation';

interface Props {
    errors: ApiValidationError[];
    søknadStepConfig: SoknadStepsConfig<StepID>;
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
                    const stepTexts = soknadStepUtils.getStepTexts(intl, søknadStepConfig[error.stepId]);
                    return (
                        <BodyLong as="div" key={error.stepId} className="bodyTextColor">
                            <p>{error.feilmelding}</p>
                            <p>
                                <FormattedMessage id="steg.oppsummering.validering.navigasjonTilStegInfo" />
                            </p>
                            <ActionLink onClick={() => navigate(søknadStepConfig[error.stepId].route)}>
                                <FormattedMessage
                                    id="steg.oppsummering.validering.navigasjonTilStegGåTil"
                                    tagName="span"
                                />{' '}
                                &quot;
                                {stepTexts.stepTitle}&quot;
                            </ActionLink>
                        </BodyLong>
                    );
                })}
            </ErrorSummary>
        </FormBlock>
    );
};

export default ApiValidationSummary;
