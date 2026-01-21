import { Heading, VStack } from '@navikt/ds-react';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';

interface Props {
    tittel: string;
    children?: React.ReactNode;
}

const Kvittering = ({ tittel, children }: Props) => {
    return (
        <VStack gap="space-40">
            <VStack align="center" gap="space-40">
                <CheckmarkIcon />
                <Heading level="1" size="large">
                    {tittel}
                </Heading>
            </VStack>
            {children}
        </VStack>
    );
};

export default Kvittering;
