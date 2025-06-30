import { HStack } from '@navikt/ds-react';
import DiskresjonskodeTag from './DiskresjonskodeTag';
import { Diskresjonskode } from '@navikt/ung-deltakelse-opplyser-api-veileder';

interface Props {
    koder: Diskresjonskode[];
}

const DiskresjonskoderTags = ({ koder }: Props) => {
    if (koder.length === 0) {
        return null;
    }
    return (
        <HStack gap="2">
            {koder.map((kode, index) => (
                <DiskresjonskodeTag key={index} kode={kode} />
            ))}
        </HStack>
    );
};

export default DiskresjonskoderTags;
