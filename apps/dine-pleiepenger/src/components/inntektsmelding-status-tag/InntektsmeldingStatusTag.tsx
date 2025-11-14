import { Tag } from '@navikt/ds-react';

import { InntektsmeldingStatus } from '../../types/Inntektsmelding';

export const InntektsmeldingStatusTag = ({ status }: { status?: InntektsmeldingStatus }) => {
    switch (status) {
        case InntektsmeldingStatus.I_BRUK:
            return (
                <Tag variant="success" size="small">
                    I bruk
                </Tag>
            );
        case InntektsmeldingStatus.ERSTATTET_AV_NYERE:
            return (
                <Tag variant="neutral" size="small">
                    Erstattet av nyere
                </Tag>
            );
        case InntektsmeldingStatus.IKKE_RELEVANT:
            return (
                <Tag variant="neutral" size="small">
                    Ikke relevant
                </Tag>
            );
        case InntektsmeldingStatus.MANGLER_DATO:
            return (
                <Tag variant="warning" size="small">
                    Mangler dato
                </Tag>
            );
        default:
            return (
                <Tag variant="warning" size="small">
                    [TODO]
                </Tag>
            );
    }
};
