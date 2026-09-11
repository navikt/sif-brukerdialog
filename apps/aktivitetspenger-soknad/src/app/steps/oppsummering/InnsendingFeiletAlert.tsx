import { BodyLong, List, LocalAlert, ReadMore, VStack } from '@navikt/ds-react';
import { ApiError, ApiErrorType, getInvalidParametersFromApiError } from '@sif/api';
import { useEffect, useRef } from 'react';

import { AppText, useAppIntl } from '@app/i18n';

interface Props {
    error: ApiError;
}

export const InnsendingFeiletAlert = ({ error }: Props) => {
    const { text } = useAppIntl();
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
                {invalidParameters ? (
                    <VStack gap="space-16">
                        <BodyLong>
                            <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.1" />
                        </BodyLong>
                        {invalidParameters.length > 0 && (
                            <ReadMore header={text('oppsummeringSteg.innsendingFeilet.merInformasjon.header')}>
                                <List>
                                    {invalidParameters.map((invalidParameter) => (
                                        <List.Item key={`${invalidParameter.parameterName}-${invalidParameter.reason}`}>
                                            {invalidParameter.reason}
                                        </List.Item>
                                    ))}
                                </List>
                            </ReadMore>
                        )}
                        <BodyLong>
                            <AppText
                                id="oppsummeringSteg.innsendingFeilet.tekst.generell.2"
                                values={{ Telefon: (value) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span> }}
                            />
                        </BodyLong>
                    </VStack>
                ) : (
                    error.message
                )}
            </LocalAlert.Content>
        </LocalAlert>
    );
};
