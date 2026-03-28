import { BodyLong, Box, Heading } from '@navikt/ds-react';

import { UngUiText } from '../../i18n';

export const InnsynDefaultErrorMessage = () => {
    return (
        <Box paddingBlock="space-40">
            <Heading level="2" size="medium">
                <UngUiText id="@ungUi.defaultErrorMessage.heading" />
            </Heading>
            <BodyLong>
                <UngUiText id="@ungUi.defaultErrorMessage.message" />
            </BodyLong>
        </Box>
    );
};
