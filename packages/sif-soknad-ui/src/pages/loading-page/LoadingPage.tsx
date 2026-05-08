import { BodyShort, Box, Heading, Loader, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useSifSoknadUiIntl } from '../../i18n';

interface Props {
    applicationTitle: string;
    showApplicationTitle?: boolean;
}

export const LoadingPage = ({ applicationTitle, showApplicationTitle = true }: Props) => {
    const { text } = useSifSoknadUiIntl();

    return (
        <ApplicationPage
            hideAppHeader
            documentTitle={text('@sifSoknadUi.loadingPage.documentTitle', { applicationTitle })}
            applicationTitle={applicationTitle}>
            <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
                <Box paddingBlock="space-48" paddingInline="space-64" background="neutral-softA" borderRadius="16">
                    <VStack gap="space-24" align="center" maxWidth="30rem" minWidth="15rem">
                        <Loader size="3xlarge" title={text('@sifSoknadUi.loadingPage.loaderTitle')} />
                        <Heading level="1" size="medium">
                            {text('@sifSoknadUi.loadingPage.loaderTitle')}
                        </Heading>
                        {showApplicationTitle && <BodyShort size="small">{applicationTitle}</BodyShort>}
                    </VStack>
                </Box>
            </VStack>
        </ApplicationPage>
    );
};
