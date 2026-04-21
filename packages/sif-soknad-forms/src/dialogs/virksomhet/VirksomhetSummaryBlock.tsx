import { BodyShort, Box, Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    header: string;
    level?: '2' | '3' | '4';
    children: ReactNode;
}

export const VirksomhetSummaryBlock = ({ header, level = '2', children }: Props) => (
    <Box>
        <Heading level={level} size="xsmall">
            {header}
        </Heading>
        <BodyShort as="div">{children}</BodyShort>
    </Box>
);
