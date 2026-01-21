import { Bleed, Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { ApplicationPictogram } from '@navikt/sif-common-soknad-ds/src/components/application-pictogram/ApplicationPictogram';
import { AppText } from '@shared/i18n';

const SøknadHeader = () => {
    return (
        <Bleed marginInline={{ lg: "space-96" }}>
            <Stack
                gap="space-24"
                direction={{ sm: 'row-reverse', lg: 'row' }}
                justify={{ sm: 'space-between', lg: 'start' }}
                wrap={false}>
                <Show above="sm">
                    <ApplicationPictogram />
                </Show>
                <VStack gap="space-4">
                    <Heading level="1" size="xlarge">
                        <AppText id="søknad.tittel.shy" />
                    </Heading>
                </VStack>
            </Stack>
        </Bleed>
    );
};

export default SøknadHeader;
