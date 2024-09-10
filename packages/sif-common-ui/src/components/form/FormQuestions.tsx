import { VStack } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
}

const FormQuestions = ({ children }: Props) => {
    return <VStack gap="8">{children}</VStack>;
};

export default FormQuestions;
