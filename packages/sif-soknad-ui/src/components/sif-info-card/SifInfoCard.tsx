import {
    CheckmarkCircleFillIcon,
    XMarkOctagonFillIcon,
    InformationSquareFillIcon,
    ExclamationmarkTriangleFillIcon,
} from '@navikt/aksel-icons';
import { InfoCard, InfoCardProps } from '@navikt/ds-react';
import { ReactNode, Ref } from 'react';

interface Props extends InfoCardProps {
    children: ReactNode;
    variant?: 'info' | 'warning' | 'error' | 'success';
    ref?: Ref<HTMLDivElement>;
}

export const SifInfoCard = ({ children, ref, ...props }: Props) => {
    switch (props.variant) {
        case 'success':
            return (
                <InfoCard data-color="success" ref={ref} {...props}>
                    <InfoCard.Message
                        icon={<CheckmarkCircleFillIcon style={{ color: 'var(--ax-bg-success-strong)' }} aria-hidden />}>
                        {children}
                    </InfoCard.Message>
                </InfoCard>
            );
        case 'error':
            return (
                <InfoCard data-color="danger" ref={ref} {...props}>
                    <InfoCard.Message
                        icon={<XMarkOctagonFillIcon style={{ color: 'var(--ax-bg-danger-strong)' }} aria-hidden />}>
                        {children}
                    </InfoCard.Message>
                </InfoCard>
            );
        case 'warning':
            return (
                <InfoCard data-color="warning" ref={ref} {...props}>
                    <InfoCard.Message
                        icon={
                            <ExclamationmarkTriangleFillIcon
                                style={{ color: 'var(--ax-bg-warning-strong)' }}
                                aria-hidden
                            />
                        }>
                        {children}
                    </InfoCard.Message>
                </InfoCard>
            );
        case 'info':
        case undefined:
            return (
                <InfoCard data-color="info" ref={ref} {...props}>
                    <InfoCard.Message
                        icon={<InformationSquareFillIcon style={{ color: 'var(--ax-bg-info-strong)' }} aria-hidden />}>
                        {children}
                    </InfoCard.Message>
                </InfoCard>
            );
    }
};
