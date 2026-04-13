import { BodyShort, Box, VStack } from '@navikt/ds-react';
import { Duration } from '@navikt/sif-common-utils';
import { useId } from 'react';

import { AppText } from '../../i18n';

interface Props {
    title: string;
    tid: Partial<Duration>;
}

export const TidDag = ({ title, tid }: Props) => {
    const { hours = '0', minutes = '0' } = tid;
    const labelId = useId();

    return (
        <VStack gap="space-2">
            <Box>
                <BodyShort textColor="subtle" as="div" size="small" id={labelId}>
                    {title}
                </BodyShort>
            </Box>
            <Box>
                <BodyShort textColor="default" as="div" weight="semibold" aria-labelledby={labelId}>
                    <AppText id="psb.timerOgMinutter.kompakt" values={{ timer: hours, minutter: minutes }} />
                </BodyShort>
            </Box>
        </VStack>
    );
};
