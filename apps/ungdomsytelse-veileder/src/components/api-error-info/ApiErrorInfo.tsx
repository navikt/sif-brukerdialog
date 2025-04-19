import { Alert, BodyShort, VStack } from '@navikt/ds-react';
import { ApiError, ApiErrorType } from '@navikt/ung-common';

interface Props {
    apiError: ApiError;
}

const getTexts = ({ error, context }: ApiError) => {
    switch (error.type) {
        case ApiErrorType.NetworkError:
            return {
                title: 'Feil ved henting av data',
                message: error.message,
                context: context,
            };
        case ApiErrorType.ValidationError:
            return {
                title: 'Feil format på data',
                message: error.message,
                details: error.originalError,
            };
        case ApiErrorType.UnknownError:
            return {
                title: 'Ukjent feil',
                message: error.message,
            };
    }
};

const ApiErrorInfo = ({ apiError }: Props) => {
    const texts = getTexts(apiError);
    return (
        <Alert variant="error" size="small">
            <VStack gap="2" className="pb-2">
                <BodyShort weight="semibold">{texts.title}</BodyShort>
                <BodyShort>{texts.message}</BodyShort>
                <BodyShort textColor="subtle" size="small">
                    [{texts.context}]
                </BodyShort>
            </VStack>
        </Alert>
    );
};

export default ApiErrorInfo;
