import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';
import { Heading, InfoCard, VStack } from '@navikt/ds-react';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
    infoTittel: string;
    infoInnhold?: ReactNode;
    children?: ReactNode;
    setFocusOnHeadingOnMount?: boolean;
}

export const Kvittering = ({ infoTittel, infoInnhold, children, setFocusOnHeadingOnMount = true }: Props) => {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (setFocusOnHeadingOnMount) {
            headingRef.current?.focus();
        }
    }, [setFocusOnHeadingOnMount]);

    return (
        <VStack gap="space-40">
            <InfoCard data-color="success">
                <InfoCard.Message icon={<CheckmarkCircleFillIcon aria-hidden="true" color="#06893A" />}>
                    <VStack gap="space-16">
                        <Heading level="1" size="small" ref={headingRef} tabIndex={-1}>
                            {infoTittel}
                        </Heading>
                        {infoInnhold}
                    </VStack>
                </InfoCard.Message>
            </InfoCard>
            {children}
        </VStack>
    );
};

export default Kvittering;
