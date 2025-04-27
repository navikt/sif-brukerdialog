import { Heading, HStack, VStack } from '@navikt/ds-react';
import BorderBox from '../border-box/BorderBox';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';

interface Props {
    title?: string;
    size?: 'medium' | 'small';
}

const LoadIndicator = ({ title, size = 'medium' }: Props) => {
    const small = size === 'small';

    return (
        <HStack paddingBlock={small ? '12 0' : '32 0'} paddingInline={small ? '5' : '6'} justify="center">
            <BorderBox paddingBlock={small ? '5' : '12'} maxWidth={small ? '20rem' : '30rem'}>
                <VStack gap="5">
                    <HStack align="center" justify="center">
                        <LoadingSpinner size={small ? '2xlarge' : '3xlarge'} title="Henter deltaker" />
                    </HStack>
                    <Heading level="3" size={size} align="center" as="p">
                        {title || 'Henter informasjon'}
                    </Heading>
                </VStack>
            </BorderBox>
        </HStack>
    );
};

export default LoadIndicator;
