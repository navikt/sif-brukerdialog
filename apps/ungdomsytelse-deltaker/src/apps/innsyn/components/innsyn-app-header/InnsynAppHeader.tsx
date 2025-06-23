import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { YtelseNavn } from '../../atoms/ytelse-navn/YtelseNavn';
import { UngdomsprogramPictogram } from '../../atoms/svg/UngdomsprogramPictogram';

interface Props {
    startdato: Date;
}

const InnsynAppHeader = ({ startdato }: Props) => {
    return (
        <Stack
            gap="6"
            direction={{ sm: 'row-reverse', md: 'row' }}
            justify={{ sm: 'space-between', md: 'start' }}
            align="center"
            wrap={false}>
            <Show above="sm">
                <UngdomsprogramPictogram />
            </Show>
            <VStack gap="1">
                <Heading level="1" size="xlarge">
                    <YtelseNavn />
                </Heading>
                <div className="uppercase">Startdato {dateFormatter.full(startdato)}</div>
            </VStack>
        </Stack>
    );
};

export default InnsynAppHeader;
