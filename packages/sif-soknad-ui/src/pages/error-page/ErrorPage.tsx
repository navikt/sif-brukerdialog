import { type ReactNode } from 'react';

import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useSifSoknadUiIntl } from '../../i18n';
import { InitialDataErrorContent } from './content/InitialDataErrorContent';

interface Props {
    applicationTitle: string;
    children?: ReactNode;
}

export const ErrorPage = ({ applicationTitle, children }: Props) => {
    const { text } = useSifSoknadUiIntl();

    return (
        <ApplicationPage
            documentTitle={text('@sifSoknadUi.errorPage.documentTitle')}
            applicationTitle={applicationTitle}>
            {children ?? <InitialDataErrorContent />}
        </ApplicationPage>
    );
};
