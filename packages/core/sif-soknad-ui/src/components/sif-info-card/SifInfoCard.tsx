import {
    CheckmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
    InformationSquareFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';
import { BodyShort, InfoCard, InfoCardProps } from '@navikt/ds-react';
import { ReactNode, Ref } from 'react';

import { useSifSoknadUiIntl } from '../../i18n';

type Variant = 'info' | 'warning' | 'error' | 'success';

interface Props extends InfoCardProps {
    children: ReactNode;
    variant?: Variant;
    ref?: Ref<HTMLDivElement>;
}

const variantConfig = {
    info: { color: 'info', Icon: InformationSquareFillIcon, statusKey: undefined },
    success: { color: 'success', Icon: CheckmarkCircleFillIcon, statusKey: undefined },
    warning: {
        color: 'warning',
        Icon: ExclamationmarkTriangleFillIcon,
        statusKey: '@sifSoknadUi.sifInfoCard.status.warning',
    },
    error: { color: 'danger', Icon: XMarkOctagonFillIcon, statusKey: '@sifSoknadUi.sifInfoCard.status.error' },
} as const;

export const SifInfoCard = ({ children, variant = 'info', ref, ...props }: Props) => {
    const { text } = useSifSoknadUiIntl();
    const { color, Icon, statusKey } = variantConfig[variant];

    return (
        <InfoCard data-color={color} ref={ref} {...props}>
            <InfoCard.Message icon={<Icon style={{ color: `var(--ax-bg-${color}-strong)` }} aria-hidden />}>
                {/* Alvorlighetsgraden vises bare med farge og ikon, så skjermlesere får den som tekst */}
                {statusKey && (
                    <BodyShort as="span" visuallyHidden>
                        {`${text(statusKey)}: `}
                    </BodyShort>
                )}
                {children}
            </InfoCard.Message>
        </InfoCard>
    );
};
