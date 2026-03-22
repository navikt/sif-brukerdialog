import { Alert, BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { ApiError, isApiAxiosError } from '../utils/errorHandlers';

interface Props {
    error: ApiError;
    detaljert?: boolean;
}

export const ApiErrorAlert = ({ error, detaljert }: Props) => {
    return (
        <Alert variant="error">
            {isApiAxiosError(error) ? (
                <VStack gap="space-16">
                    <BodyShort>{error.message}</BodyShort>
                    {detaljert && (
                        <ReadMore header="Vis flere detaljer">
                            <VStack gap="space-8">
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
                <>error.message</>
            )}
        </Alert>
    );
};
