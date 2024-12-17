import { Heading, VStack } from '@navikt/ds-react';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
interface Props {
    tittel: string;
    children?: React.ReactNode;
}

const Kvittering = ({ tittel, children }: Props) => {
    return (
        <VStack gap="10">
            <VStack align="center" gap="10">
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
