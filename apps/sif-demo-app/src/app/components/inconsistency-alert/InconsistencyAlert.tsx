import { søknadStepConfig, SøknadStepId, stepTitles } from '@app/setup';
import { Box } from '@navikt/ds-react';
import { InconsistentFormValuesMessage } from '@sif/soknad/consistency';
import { useNavigate } from 'react-router-dom';

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
