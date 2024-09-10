import { Heading, VStack } from '@navikt/ds-react';
import FormQuestions from './FormQuestions';

interface Props {
    title?: string;
    children?: React.ReactNode;
}

const FormSection = ({ title, children }: Props) => {
    return (
        <VStack gap="4">
            {title ? <FormSetionHeading>{title}</FormSetionHeading> : null}
            <FormQuestions>{children}</FormQuestions>
        </VStack>
    );
};

interface FormSetionHeadingProps {
    children?: React.ReactNode;
}

export const FormSetionHeading = ({ children }: FormSetionHeadingProps) => (
    <Heading level="2" size="medium">
        {children}
    </Heading>
);

export default FormSection;
