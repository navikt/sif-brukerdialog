import { Bleed, Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { ApplicationPictogram } from '@navikt/sif-common-soknad-ds/src/components/application-pictogram/ApplicationPictogram';

interface Props {
    tittel: string;
}

const SøknadHeader = ({ tittel }: Props) => {
    return (
        <Bleed marginInline={{ lg: '24' }}>
            <Stack
                gap="6"
                direction={{ sm: 'row-reverse', lg: 'row' }}
                justify={{ sm: 'space-between', lg: 'start' }}
                wrap={false}>
                <Show above="sm">
                    <ApplicationPictogram />
                </Show>
                <VStack gap="1">
                    <Heading level="1" size="xlarge">
                        {tittel}
                    </Heading>
                </VStack>
            </Stack>
        </Bleed>
    );
};

export default SøknadHeader;
