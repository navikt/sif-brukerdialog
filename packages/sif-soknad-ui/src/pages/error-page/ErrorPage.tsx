import { LocalAlert } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { SifSoknadUiText, useSifSoknadUiIntl } from '../../i18n';

interface Props {
    applicationTitle: string;
}

export const ErrorPage = ({ applicationTitle }: Props) => {
    const { text } = useSifSoknadUiIntl();

    return (
        <ApplicationPage
            documentTitle={text('@sifSoknadUi.errorPage.documentTitle')}
            applicationTitle={applicationTitle}>
            <LocalAlert status="error">
                <LocalAlert.Header>
                    <LocalAlert.Title>
                        <SifSoknadUiText id="@sifSoknadUi.errorPage.alertTitle" />
                    </LocalAlert.Title>
                </LocalAlert.Header>
            </LocalAlert>
        </ApplicationPage>
    );
};
