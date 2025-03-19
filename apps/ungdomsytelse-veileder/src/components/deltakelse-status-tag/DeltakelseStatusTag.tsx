import { Tag } from '@navikt/ds-react';
import { Deltakelse } from '@navikt/ung-common';
import dayjs from 'dayjs';

interface Props {
    deltakelse: Deltakelse;
}

const DeltakelseStatusTag = ({ deltakelse: { fraOgMed } }: Props) => {
    // if (erAktiv) {
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
};

export default DeltakelseStatusTag;
