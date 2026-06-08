import { Heading, VStack } from '@navikt/ds-react';

interface Props {
    tittel: string;
    children?: React.ReactNode;
}

const CheckmarkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="68"
        height="72"
        viewBox="0 0 24 24"
        focusable={false}
        role="presentation">
        <path
            stroke="#06893A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            fill="none"
            d="M23.5.5l-16.5 23-6.5-6.5"
            strokeWidth="2"
        />
    </svg>
);

export const Kvittering = ({ tittel, children }: Props) => {
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
