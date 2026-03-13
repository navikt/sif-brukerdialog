import { Alert, Heading } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad/pages';

import { useAppIntl } from '../../i18n';

interface ErrorPageProps {
    error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
    const { text } = useAppIntl();
    return (
        <ApplicationPage documentTitle="Noe gikk galt" applicationTitle={text('application.title')}>
            <Heading level="1" size="large" spacing>
                Noe gikk galt
            </Heading>
            <Alert variant="error">{error}</Alert>
        </ApplicationPage>
    );
};
