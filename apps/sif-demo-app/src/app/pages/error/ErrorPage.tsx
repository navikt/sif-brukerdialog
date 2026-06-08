import { LocalAlert } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useAppIntl } from '../../i18n';

interface ErrorPageProps {
    error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
    const { text } = useAppIntl();
    return (
        <ApplicationPage documentTitle="Noe gikk galt" applicationTitle={text('application.title')}>
            <LocalAlert status="error">
                <LocalAlert.Header>
                    <LocalAlert.Title>Det oppstod en feil. Vennligst prøv igjen senere.</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>{error}</LocalAlert.Content>
            </LocalAlert>
        </ApplicationPage>
    );
};
