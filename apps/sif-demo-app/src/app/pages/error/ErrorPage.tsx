import { Alert, Heading } from '@navikt/ds-react';

import { AppPage } from '../../components/app-page/AppPage';

interface ErrorPageProps {
    error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
    return (
        <AppPage>
            <Heading size="large">Noe gikk galt</Heading>
            <Alert variant="error">{error}</Alert>
        </AppPage>
    );
};
