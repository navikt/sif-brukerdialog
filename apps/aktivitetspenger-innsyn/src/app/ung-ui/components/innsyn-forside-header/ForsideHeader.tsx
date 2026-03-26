import { Heading, Show, Stack, VStack } from '@navikt/ds-react';

import { UngdomsprogramPictogram } from '../svg/UngdomsprogramPictogram';

interface Props {
    title: string;
    subtitle?: string;
}

const InnsynForsideHeader = ({ title, subtitle }: Props) => {
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
                    {title}
                </Heading>
                {subtitle && <div className="uppercase">{subtitle}</div>}
            </VStack>
        </Stack>
    );
};

export default InnsynForsideHeader;
