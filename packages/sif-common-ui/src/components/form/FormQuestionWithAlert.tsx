import { VStack } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    alert?: React.ReactNode;
}

const FormQuestionWithAlert = ({ children, alert }: Props) => {
    return (
        <VStack gap="4">
            {children}
            {alert}
        </VStack>
    );
};

export default FormQuestionWithAlert;
