import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useSifSoknadUiIntl } from '../../i18n';

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
            {children}
        </ApplicationPage>
    );
};
