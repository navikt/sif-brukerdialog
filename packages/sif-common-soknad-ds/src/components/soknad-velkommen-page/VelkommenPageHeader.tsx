import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { ApplicationPictogram } from '@navikt/sif-common-soknad-ds/src/components/application-pictogram/ApplicationPictogram';

import SoknadHeader from '../soknad-header/SoknadHeader';

interface Props {
    title: string;
    useStandard?: boolean;
}

const VelkommenPageHeader = ({ title, useStandard }: Props) => {
    if (useStandard) {
        return <SoknadHeader title={title} useStandard={true} level="1" />;
    }

    return (
        <Stack
            gap="6"
            direction={{ sm: 'row-reverse', md: 'row' }}
            justify={{ sm: 'space-between', md: 'start' }}
            align="center"
            wrap={false}>
            <Show above="sm">
                <ApplicationPictogram />
            </Show>
            <VStack gap="1">
                <Heading level="1" size="large">
                    {title}
                </Heading>
            </VStack>
        </Stack>
    );
};

export default VelkommenPageHeader;
