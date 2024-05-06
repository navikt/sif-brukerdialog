import { BodyLong, ErrorSummary } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import { useNavigate } from 'react-router-dom';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../../i18n';
import { StepID } from '../../../types/StepID';
import { ApiValidationError } from '../../../validation/apiValuesValidation';

interface Props {
    errors: ApiValidationError[];
    søknadStepConfig: SoknadStepsConfig<StepID>;
}

const ApiValidationSummary: React.FunctionComponent<Props> = ({ errors, søknadStepConfig }) => {
    const { intl } = useAppIntl();
    const navigate = useNavigate();
    if (errors.length === 0) {
        return null;
    }
    return (
        <FormBlock>
            <ErrorSummary heading={intlHelper(intl, 'apiValidationError.tittel')}>
                {errors.map((error) => {
                    const stepTexts = soknadStepUtils.getStepTexts(intl, søknadStepConfig[error.stepId]);
                    return (
                        <BodyLong as="div" key={error.stepId} className="bodyTextColor">
                            <p>{error.feilmelding}</p>
                            <p>
                                <AppText id="steg.oppsummering.validering.navigasjonTilStegInfo" />
                            </p>
                            <ActionLink onClick={() => navigate(søknadStepConfig[error.stepId].route)}>
                                <AppText id="steg.oppsummering.validering.navigasjonTilStegGåTil" /> &quot;
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
