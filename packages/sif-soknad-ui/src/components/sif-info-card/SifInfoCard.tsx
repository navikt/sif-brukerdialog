import { ExclamationmarkTriangleFillIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard, InfoCardProps } from '@navikt/ds-react';
import React from 'react';

interface Props extends InfoCardProps {
    children: React.ReactNode;
    variant?: 'info' | 'warning';
}

export const SifInfoCard = ({ children, ...props }: Props) => {
    switch (props.variant) {
        case 'warning':
            return (
                <InfoCard data-color="warning" {...props}>
                    <InfoCard.Message icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                        {children}
                    </InfoCard.Message>
                </InfoCard>
            );
        default:
            return (
                <InfoCard data-color="info" {...props}>
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>{children}</InfoCard.Message>
                </InfoCard>
            );
    }
};
