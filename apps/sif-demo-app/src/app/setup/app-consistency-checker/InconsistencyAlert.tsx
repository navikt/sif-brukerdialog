import { Box } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { InconsistentFormValuesMessage } from '../../../rammeverk/consistency';
import { søknadStepConfig, SøknadStepId, stepTitles } from '../../config/søknadStepConfig';

interface Props {
    stepId: SøknadStepId;
}

export const InconsistencyAlert = ({ stepId }: Props) => {
    const navigate = useNavigate();
    return (
        <Box marginBlock="space-0 space-32">
            <InconsistentFormValuesMessage
                stepId={stepId}
                stepTitle={stepTitles[stepId]}
                onNavigateToStep={() => navigate(`/soknad/${søknadStepConfig[stepId].route}`)}
            />
        </Box>
    );
};
