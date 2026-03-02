import { Buildings3Icon } from '@navikt/aksel-icons';
import { FormSummary, Heading, HStack } from '@navikt/ds-react';

type Props = {
    title: string;
    children: React.ReactNode;
};

const ArbeidstidFormSummary = ({ title, children }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <HStack gap="space-8" align="center">
                    <Buildings3Icon role="presentation" aria-hidden={true} fontSize="1.75rem" />
                    <Heading level="3" size="small">
                        {title}
                    </Heading>
                </HStack>
            </FormSummary.Header>
            <FormSummary.Answers>{children}</FormSummary.Answers>
        </FormSummary>
    );
};

export default ArbeidstidFormSummary;
