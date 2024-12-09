import { Deltakelse } from '../../api/types';
import dayjs from 'dayjs';
import { Tag } from '@navikt/ds-react';

interface Props {
    deltakelse: Deltakelse;
}

const DeltakelseStatusTag = ({ deltakelse: { erAktiv, fraOgMed } }: Props) => {
    if (erAktiv) {
        if (dayjs(fraOgMed).isAfter(dayjs())) {
            return (
                <Tag size="small" variant="alt3-filled">
                    Ikke startet
                </Tag>
            );
        } else if (dayjs(fraOgMed).isSameOrBefore(dayjs())) {
            return (
                <Tag size="small" variant="success">
                    Pågående
                </Tag>
            );
        }
    }
    if (!erAktiv) {
        if (dayjs(fraOgMed).isAfter(dayjs())) {
        }
    }
};

export default DeltakelseStatusTag;
