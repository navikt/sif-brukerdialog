import { List, LocalAlert } from '@navikt/ds-react';
import { ApiError, ApiErrorType, getInvalidParametersFromApiError, InvalidParameterViolation } from '@sif/api';
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
        <LocalAlert status="error" ref={alertRef}>
            <LocalAlert.Header>
                <LocalAlert.Title>
                    <AppText id="oppsummeringSteg.innsendingFeilet.tittel" />
                </LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
                {invalidParameters ? renderFeilmelding(invalidParameters[0]) : error.message}
            </LocalAlert.Content>
        </LocalAlert>
    );
};
