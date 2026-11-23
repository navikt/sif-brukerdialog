import { FormSummary, HStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

import EndreLenke from './EndreLenke';

interface Props {
    tittel: string;
    endreLabel: string;
    onEndre: () => void;
    /** Styrer «Endret»-taggen, og om «Ingen endring registrert» vises i stedet for children */
    harEndring: boolean;
    children: ReactNode;
}

const OppsummeringSeksjon = ({ tittel, endreLabel, onEndre, harEndring, children }: Props) => {
    if (!harEndring) {
        return null;
    }
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <HStack align="center" gap="space-12">
                        {tittel}
                    </HStack>
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Value>{children}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
                <EndreLenke label={endreLabel} onClick={onEndre} />
            </FormSummary.Footer>
        </FormSummary>
    );
};

export default OppsummeringSeksjon;
