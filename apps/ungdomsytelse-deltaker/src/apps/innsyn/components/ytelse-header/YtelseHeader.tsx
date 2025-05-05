import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { ApplicationPictogram } from '@navikt/sif-common-soknad-ds/src/components/application-pictogram/ApplicationPictogram';
import { SøkerJobbPictogram } from './SøkerJobbPictogram';

interface Props {
    title: string;
    description?: React.ReactNode;
    variant?: 'søknad' | 'innsyn';
}

const YtelseHeader = ({ title, description, variant }: Props) => {
    return (
        <Stack
            gap="6"
            direction={{ sm: 'row-reverse', md: 'row' }}
            justify={{ sm: 'space-between', md: 'start' }}
            align="center"
            wrap={false}>
            <Show above="sm">{variant === 'søknad' ? <ApplicationPictogram /> : <SøkerJobbPictogram />}</Show>
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
