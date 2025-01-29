import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { ApplicationPictogram } from '@navikt/sif-common-soknad-ds/src/components/application-pictogram/ApplicationPictogram';

interface Props {
    title: string;
    description?: React.ReactNode;
}

const YtelseHeader = ({ title, description }: Props) => {
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
                {description}
            </VStack>
        </Stack>
    );
};

export default YtelseHeader;
