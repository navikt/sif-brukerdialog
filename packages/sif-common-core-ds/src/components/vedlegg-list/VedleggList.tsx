import { Vedlegg } from '../../types/Vedlegg';
import { FileUpload, VStack } from '@navikt/ds-react';

interface Props {
    vedlegg: Vedlegg[];
    spacing?: boolean;
}

const VedleggList = ({ vedlegg, spacing = true }: Props) => {
    return (
        <VStack as="ul" gap="2" marginBlock={spacing ? '2' : undefined}>
            {vedlegg.map((file, index) => (
                <FileUpload.Item
                    as="li"
                    key={index}
                    file={file.file}
                    onFileClick={file.info ? () => window.open(file.info?.url, '_blank') : undefined}
                />
            ))}
        </VStack>
    );
};

export default VedleggList;
