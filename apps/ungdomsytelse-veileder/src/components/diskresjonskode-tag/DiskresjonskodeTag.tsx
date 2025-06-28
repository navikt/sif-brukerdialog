import { Tag, TagProps } from '@navikt/ds-react';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

interface Props extends Omit<TagProps, 'variant' | 'children'> {
    kode: VeilederApi.Diskresjonskode;
}

const DiskresjonskodeTag = ({ kode: kode, ...rest }: Props) => {
    switch (kode) {
        case VeilederApi.Diskresjonskode.KODE6:
            return (
                <Tag size="small" variant="error" {...rest}>
                    Kode 6
                </Tag>
            );
        case VeilederApi.Diskresjonskode.KODE7:
            return (
                <Tag size="small" variant="warning" {...rest}>
                    Kode 7
                </Tag>
            );
        case VeilederApi.Diskresjonskode.SKJERMET:
            return (
                <Tag size="small" variant="warning" {...rest}>
                    Skjermet
                </Tag>
            );
    }
};

export default DiskresjonskodeTag;
