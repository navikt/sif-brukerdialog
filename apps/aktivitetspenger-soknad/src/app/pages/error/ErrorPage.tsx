import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad/pages';

import { useAppIntl } from '../../i18n';
interface Props {
    error?: string;
}

export const ErrorPage = ({ error }: Props) => {
    const { text } = useAppIntl();

    return (
        <ApplicationPage documentTitle="Noe gikk galt" applicationTitle={text('application.title')}>
            <VStack gap="space-24">
                <Heading size="xlarge" level="1">
                    Oops, noe gikk galt
                </Heading>
                <Alert variant="error">
                    <BodyLong>Det oppstod en feil. Vennligst prøv igjen senere.</BodyLong>
                    {error ? <pre>{error}</pre> : null}
                </Alert>
            </VStack>
        </ApplicationPage>
    );
};
