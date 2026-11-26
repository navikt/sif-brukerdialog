import { Heading, List, VStack } from '@navikt/ds-react';
import { ApiError, ApiErrorType, getInvalidParametersFromApiError, InvalidParameterViolation } from '@sif/api';
import { SifAlert } from '@sif/soknad-ui';
import { useEffect, useRef } from 'react';

import { AppText } from '../../i18n';

interface Props {
    error: ApiError;
}

const renderFeilmelding = (invalidParameter?: InvalidParameterViolation) => {
    const erBeskrivelseFeil = invalidParameter?.parameterName === 'høyereRisikoForFraværBeskrivelse';

    return (
        <>
            {erBeskrivelseFeil ? (
                <List>
                    <List.Item>
                        <AppText id="oppsummeringSteg.innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil" />
                    </List.Item>
                </List>
            ) : (
                <p>
                    <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.1" />
                </p>
            )}
            <p>
                <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.2" />
            </p>
            <p>
                <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.3" />
            </p>
            <p>
                <AppText
                    id="oppsummeringSteg.innsendingFeilet.tekst.generell.4"
                    values={{ Telefon: (value) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span> }}
                />
            </p>
        </>
    );
};

export const InnsendingFeiletAlert = ({ error }: Props) => {
    const alertRef = useRef<HTMLDivElement>(null);
    const erZodFeil = error.type === ApiErrorType.ZodValidationError;
    const invalidParameters = erZodFeil ? [] : getInvalidParametersFromApiError(error);

    useEffect(() => {
        alertRef.current?.focus();
    }, [error]);

    return (
        <SifAlert variant="error" ref={alertRef} tabIndex={-1}>
            <VStack gap="space-16">
                <Heading level="2" size="small">
                    <AppText id="oppsummeringSteg.innsendingFeilet.tittel" />
                </Heading>
                {invalidParameters ? renderFeilmelding(invalidParameters[0]) : error.message}
            </VStack>
        </SifAlert>
    );
};
