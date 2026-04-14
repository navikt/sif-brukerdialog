import { BodyShort, Box, VStack } from '@navikt/ds-react';
import { Duration } from '@navikt/sif-common-utils';

import { AppText } from '../../i18n';

interface Props {
    title: string;
    tid: Partial<Duration>;
}

export const TidDag = ({ title, tid }: Props) => {
    const { hours = '0', minutes = '0' } = tid;

    return (
        <VStack gap="space-2">
            <Box>
                <BodyShort as="h5" textColor="subtle">
                    {title}
                </BodyShort>
            </Box>
            <Box>
                <BodyShort textColor="default" as="div" weight="semibold">
                    <AppText id="psb.timerOgMinutter.kompakt" values={{ timer: hours, minutter: minutes }} />
                </BodyShort>
            </Box>
        </VStack>
    );
};
