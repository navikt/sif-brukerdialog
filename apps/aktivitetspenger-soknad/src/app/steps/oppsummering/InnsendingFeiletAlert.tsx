import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong, Heading, List, ReadMore, VStack } from '@navikt/ds-react';
import { ApiError, ApiErrorType, getInvalidParametersFromApiError } from '@sif/api';
import { SifAlert } from '@sif/soknad-ui';
import { useEffect, useRef } from 'react';

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
        <SifAlert variant="error" ref={alertRef} tabIndex={-1}>
            <VStack gap="space-16">
                <Heading level="2" size="small">
                    <AppText id="oppsummeringSteg.innsendingFeilet.tittel" />
                </Heading>
                {invalidParameters ? (
                    <>
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
                    </>
                ) : (
                    <BodyLong>
                        <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.1" />
                    </BodyLong>
                )}
            </VStack>
        </SifAlert>
    );
};
