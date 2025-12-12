import { HStack } from '@navikt/ds-react';
import { Diskresjonskode } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import DiskresjonskodeTag from './DiskresjonskodeTag';

interface Props {
    koder: Diskresjonskode[];
}

const DiskresjonskoderTags = ({ koder }: Props) => {
    if (koder.length === 0) {
        return null;
    }
    return (
        <HStack gap="2">
            {koder.map((kode) => (
                <DiskresjonskodeTag key={kode} kode={kode} />
            ))}
        </HStack>
    );
};

export default DiskresjonskoderTags;
