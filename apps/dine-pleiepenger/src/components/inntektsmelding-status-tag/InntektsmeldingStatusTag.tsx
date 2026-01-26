import { CheckmarkHeavyIcon } from '@navikt/aksel-icons';
import { Tag, TagProps } from '@navikt/ds-react';

import { InntektsmeldingStatus } from '../../types';

type Props = Omit<TagProps, 'children' | 'variant'> & {
    status?: InntektsmeldingStatus;
    showIcon?: boolean;
};

export const InntektsmeldingStatusTag = ({ status, showIcon, ...tagProps }: Props) => {
    switch (status) {
        case InntektsmeldingStatus.I_BRUK:
            return (
                <Tag variant="success" size="small" {...tagProps}>
                    {showIcon && <CheckmarkHeavyIcon role="presentation" width="1.5em" height="1.5em" />} Gyldig
                    inntektsmelding
                </Tag>
            );
        case InntektsmeldingStatus.ERSTATTET_AV_NYERE:
            return (
                <Tag variant="neutral" size="xsmall" {...tagProps}>
                    Erstattet
                </Tag>
            );
        case InntektsmeldingStatus.IKKE_RELEVANT:
            return (
                <Tag variant="neutral" size="small" {...tagProps}>
                    Ikke relevant
                </Tag>
            );
        case InntektsmeldingStatus.MANGLER_DATO:
            return (
                <Tag variant="warning" size="small" {...tagProps}>
                    Mangler dato
                </Tag>
            );
        default:
            return (
                <Tag variant="warning" size="small" {...tagProps}>
                    [TODO]
                </Tag>
            );
    }
};
