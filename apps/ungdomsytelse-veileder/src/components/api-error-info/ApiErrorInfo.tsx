import { BodyShort, VStack } from '@navikt/ds-react';
import { ApiError, ApiErrorType } from '@navikt/ung-common';

interface Props {
    apiError: ApiError;
}

const getTexts = ({ type, context, message, originalError }: ApiError) => {
    switch (type) {
        case ApiErrorType.NetworkError:
            return {
                // title: 'Feil ved henting av data',
                message: message,
                context: context,
            };
        case ApiErrorType.ValidationError:
            return {
                title: 'Feil format på data',
                message: message,
                details: originalError,
            };
        case ApiErrorType.UnknownError:
            return {
                title: 'Ukjent feil',
                message: message,
            };
    }
};

const ApiErrorInfo = ({ apiError }: Props) => {
    const texts = getTexts(apiError);
    return (
        <VStack gap="2">
            {texts.title && <BodyShort weight="semibold">{texts.title}</BodyShort>}
            <BodyShort>{texts.message}</BodyShort>
            {/* <BodyShort textColor="subtle" size="small">
                [{texts.context}]
            </BodyShort> */}
        </VStack>
    );
};

export default ApiErrorInfo;
