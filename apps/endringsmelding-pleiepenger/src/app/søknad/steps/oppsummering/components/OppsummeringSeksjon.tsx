import { AppText } from '@app/i18n';
import { BodyShort, FormSummary, HStack, Tag } from '@navikt/ds-react';
import { ReactNode } from 'react';

import EndreLenke from './EndreLenke';

interface Props {
    tittel: string;
    endreLabel: string;
    ingenEndringTekst: string;
    onEndre: () => void;
    /** Styrer «Endret»-taggen, og om «Ingen endring registrert» vises i stedet for children */
    harEndring: boolean;
    children: ReactNode;
}

const OppsummeringSeksjon = ({ tittel, endreLabel, ingenEndringTekst, onEndre, harEndring, children }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <HStack align="center" gap="space-12">
                        {tittel}
                        {harEndring && (
                            <Tag size="small" data-color="success">
                                <AppText id="tags.endret" />
                            </Tag>
                        )}
                    </HStack>
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Value>
                        {harEndring ? children : <BodyShort as="div">{ingenEndringTekst}</BodyShort>}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
                <EndreLenke label={endreLabel} onClick={onEndre} />
            </FormSummary.Footer>
        </FormSummary>
    );
};

export default OppsummeringSeksjon;
