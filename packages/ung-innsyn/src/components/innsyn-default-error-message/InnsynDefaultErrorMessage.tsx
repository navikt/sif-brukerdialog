import { BodyLong, Box, Heading } from '@navikt/ds-react';

import { UngInnsynText } from '../../i18n';

export const InnsynDefaultErrorMessage = () => {
    return (
        <Box paddingBlock="space-40">
            <Heading level="2" size="medium">
                <UngInnsynText id="@ungInnsyn.defaultErrorMessage.heading" />
            </Heading>
            <BodyLong>
                <UngInnsynText id="@ungInnsyn.defaultErrorMessage.message" />
            </BodyLong>
        </Box>
    );
};
