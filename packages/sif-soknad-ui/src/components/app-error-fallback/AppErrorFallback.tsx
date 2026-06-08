import { Box, Heading } from '@navikt/ds-react';

import { SifSoknadUiText } from '../../i18n';

export const AppErrorFallback = () => {
    return (
        <Box paddingBlock="space-40">
            <Heading level="2" size="medium">
                <SifSoknadUiText id="@sifSoknadUi.appErrorFallback.heading" />
            </Heading>
            <p>
                <SifSoknadUiText id="@sifSoknadUi.appErrorFallback.description" />
            </p>
        </Box>
    );
};
