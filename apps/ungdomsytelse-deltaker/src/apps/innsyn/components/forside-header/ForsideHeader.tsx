import { UngdomsprogramPictogram } from '@innsyn/atoms/svg/UngdomsprogramPictogram';
import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';

interface Props {
    startdato: Date;
}

const ForsideHeader = ({ startdato }: Props) => {
    return (
        <Stack
            gap="space-24"
            direction={{ sm: 'row-reverse', md: 'row' }}
            justify={{ sm: 'space-between', md: 'start' }}
            align="center"
            wrap={false}>
            <Show above="sm">
                <UngdomsprogramPictogram />
            </Show>
            <VStack gap="space-4">
                <Heading level="1" size="xlarge">
                    <AppText id="innsynAppHeader.ytelseNavn" />
                </Heading>
                <div className="uppercase">
                    <AppText id="innsynAppHeader.startdato" values={{ dato: dateFormatter.full(startdato) }} />
                </div>
            </VStack>
        </Stack>
    );
};

export default ForsideHeader;
