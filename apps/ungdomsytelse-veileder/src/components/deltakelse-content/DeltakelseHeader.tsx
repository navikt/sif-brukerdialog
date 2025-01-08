import { Box, HStack, Tag } from '@navikt/ds-react';
import { Deltakelse } from '../../api/types';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltakelse: Deltakelse;
}

const DeltakelseHeader = ({ deltakelse }: Props) => (
    <HStack gap="4">
        <Box>{dateFormatter.compact(deltakelse.fraOgMed)}</Box>
        <>-</>
        <Box>{deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : <></>}</Box>
        {deltakelse.harSøkt ? (
            <Tag variant="success-moderate" size="small">
                Deltaker har søkt
            </Tag>
        ) : (
            <Tag variant="warning-moderate" size="small">
                Deltaker har ikke søkt enda
            </Tag>
        )}
    </HStack>
);

export default DeltakelseHeader;
