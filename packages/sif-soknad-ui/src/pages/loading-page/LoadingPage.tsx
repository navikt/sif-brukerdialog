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
                <Box
                    paddingBlock="space-64"
                    paddingInline="space-48"
                    background="default"
                    borderRadius="16"
                    borderColor="neutral-subtleA"
                    borderWidth="1">
                    <VStack gap="space-16" align="center" maxWidth="25rem" minWidth="15rem">
                        <Loader size="3xlarge" title={text('@sifSoknadUi.loadingPage.loaderTitle')} />
                        <Heading level="1" size="small">
                            {text('@sifSoknadUi.loadingPage.loaderTitle')}
                        </Heading>
                        {showApplicationTitle && (
                            <BodyShort size="small" textColor="subtle" align="center">
                                {applicationTitle}
                            </BodyShort>
                        )}
                    </VStack>
                </Box>
            </VStack>
        </ApplicationPage>
    );
};
