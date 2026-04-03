import { LocalAlert } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

interface Props {
    applicationTitle: string;
}

export const ErrorPage = ({ applicationTitle }: Props) => {
    return (
        <ApplicationPage documentTitle="Noe gikk galt" applicationTitle={applicationTitle}>
            <LocalAlert status="error">
                <LocalAlert.Header>
                    <LocalAlert.Title>Det oppstod en feil. Vennligst prøv igjen senere.</LocalAlert.Title>
                </LocalAlert.Header>
            </LocalAlert>
        </ApplicationPage>
    );
};
