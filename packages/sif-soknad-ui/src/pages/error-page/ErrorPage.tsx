import { LocalAlert } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { SifSoknadUiText, useSifSoknadUiIntl } from '../../i18n';

interface Props {
    applicationTitle: string;
    children?: React.ReactNode;
}

export const ErrorPage = ({ applicationTitle, children }: Props) => {
    const { text } = useSifSoknadUiIntl();

    return (
        <ApplicationPage
            documentTitle={text('@sifSoknadUi.errorPage.documentTitle')}
            applicationTitle={applicationTitle}>
            {children || (
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            <SifSoknadUiText id="@sifSoknadUi.errorPage.alertTitle" />
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
        </ApplicationPage>
    );
};
