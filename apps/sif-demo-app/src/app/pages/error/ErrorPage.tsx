import { Alert, Heading } from '@navikt/ds-react';

import { DefaultPage } from '../../../rammeverk/components/default-page/DefaultPage';

interface ErrorPageProps {
    error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
    return (
        <DefaultPage documentTitle="Noe gikk galt">
            <Heading size="large">Noe gikk galt</Heading>
            <Alert variant="error">{error}</Alert>
        </DefaultPage>
    );
};
