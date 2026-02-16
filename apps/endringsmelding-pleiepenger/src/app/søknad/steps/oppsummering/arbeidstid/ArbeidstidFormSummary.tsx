import { FormSummary, Heading } from '@navikt/ds-react';

type Props = {
    title: string;
    children: React.ReactNode;
};

const ArbeidstidFormSummary = ({ title, children }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <Heading level="3" size="small">
                    {title}
                </Heading>
            </FormSummary.Header>
            <FormSummary.Answers>{children}</FormSummary.Answers>
        </FormSummary>
    );
};

export default ArbeidstidFormSummary;
