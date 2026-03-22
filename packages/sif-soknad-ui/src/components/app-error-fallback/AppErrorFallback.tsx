import { Box, Heading } from '@navikt/ds-react';

import { SifSoknadUiText } from '../../i18n';

export const AppErrorFallback = () => {
    return (
        <Box paddingBlock="space-40">
            <Heading level="2" size="medium">
                <SifSoknadUiText id="@ui.appErrorFallback.heading" />
            </Heading>
            <p>
                <SifSoknadUiText id="@ui.appErrorFallback.description" />
            </p>
        </Box>
    );
};
