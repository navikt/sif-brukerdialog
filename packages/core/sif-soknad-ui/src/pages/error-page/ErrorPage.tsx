import { ApplicationPage } from '@sif/soknad-ui/pages';
import { type ReactNode } from 'react';

import { useSifSoknadUiIntl } from '../../i18n';

interface Props {
    applicationTitle: string;
    children: ReactNode;
}

export const ErrorPage = ({ applicationTitle, children }: Props) => {
    const { text } = useSifSoknadUiIntl();

    return (
        <ApplicationPage
            documentTitle={text('@sifSoknadUi.errorPage.documentTitle')}
            applicationTitle={applicationTitle}>
            {children}
        </ApplicationPage>
    );
};
