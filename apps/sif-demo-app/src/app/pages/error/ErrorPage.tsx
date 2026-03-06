import { Alert, Heading } from '@navikt/ds-react';

import { SøknadPage } from '../../components/app-page/SøknadPage';

interface ErrorPageProps {
    error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
    return (
        <SøknadPage documentTitle="Noe gikk galt">
            <Heading level="1" size="large" spacing>
                Noe gikk galt
            </Heading>
            <Alert variant="error">{error}</Alert>
        </SøknadPage>
    );
};
