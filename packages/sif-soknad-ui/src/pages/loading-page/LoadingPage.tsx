import { Loader, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useSifSoknadUiIntl } from '../../i18n';

interface Props {
    applicationTitle: string;
}

export const LoadingPage = ({ applicationTitle }: Props) => {
    const { text } = useSifSoknadUiIntl();

    return (
        <ApplicationPage
            documentTitle={text('@sifSoknadUi.loadingPage.documentTitle')}
            applicationTitle={applicationTitle}>
            <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
                <Loader size="3xlarge" title={text('@sifSoknadUi.loadingPage.loaderTitle')} />
            </VStack>
        </ApplicationPage>
    );
};
