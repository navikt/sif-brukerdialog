import { BodyLong, Box, Heading } from '@navikt/ds-react';

import { UngUiText } from '../../i18n';

export const InnsynDefaultErrorMessage = () => {
    return (
        <Box paddingBlock="space-40">
            <Heading level="2" size="medium">
                <UngUiText id="@ungInnsyn.defaultErrorMessage.heading" />
            </Heading>
            <BodyLong>
                <UngUiText id="@ungInnsyn.defaultErrorMessage.message" />
            </BodyLong>
        </Box>
    );
};
