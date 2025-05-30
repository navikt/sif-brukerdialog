import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { ApplicationPictogram } from '@navikt/sif-common-soknad-ds/src/components/application-pictogram/ApplicationPictogram';
import { UngdomsprogramPictogram } from './UngdomsprogramPictogram';

interface Props {
    title: string;
    description?: React.ReactNode;
    variant?: 'søknad' | 'innsyn';
}

const AppHeader = ({ title, description, variant }: Props) => {
    return (
        <Stack
            gap="6"
            direction={{ sm: 'row-reverse', md: 'row' }}
            justify={{ sm: 'space-between', md: 'start' }}
            align="center"
            wrap={false}>
            <Show above="sm">{variant === 'søknad' ? <ApplicationPictogram /> : <UngdomsprogramPictogram />}</Show>
            <VStack gap="1">
                <Heading level="1" size="xlarge">
                    {title}
                </Heading>
                <div className="uppercase">{description}</div>
            </VStack>
        </Stack>
    );
};

export default AppHeader;
