import { Alert, BodyShort, ReadMore, VStack } from '@navikt/ds-react';
import { ApiError, isApiAxiosError } from '@navikt/ung-common';

interface Props {
    error: ApiError;
    detaljert?: boolean;
}

const ApiErrorAlert = ({ error, detaljert }: Props) => {
    console.error(error);
    return (
        <Alert variant="error">
            {isApiAxiosError(error) ? (
                <VStack gap="4">
                    <BodyShort>{error.message}</BodyShort>
                    {detaljert && (
                        <ReadMore header="Vis flere detaljer">
                            <VStack gap="2">
                                <BodyShort>Type: {error.type}</BodyShort>
                                <BodyShort>Context: {error.context}</BodyShort>
                                <BodyShort>Message: {error.message}</BodyShort>
                                <BodyShort>
                                    Original error: {JSON.stringify(error.originalError.response?.data, null, 2)}
                                </BodyShort>
                            </VStack>
                        </ReadMore>
                    )}
                </VStack>
            ) : (
                <>{error.message}</>
            )}
        </Alert>
    );
};
export default ApiErrorAlert;
