import { AppText } from '@app/i18n';
import { BodyShort, FormSummary, HStack, Tag } from '@navikt/ds-react';
import { ReactNode, useEffect, useRef } from 'react';

import EndreLenke from './EndreLenke';

interface Props {
    tittel: string;
    endreLabel: string;
    onEndre: () => void;
    /** Styrer «Endret»-taggen, og om «Ingen endring registrert» vises i stedet for children */
    harEndring: boolean;
    /** Settes når bruker kommer tilbake fra steget seksjonen viser */
    fokuser?: boolean;
    children: ReactNode;
}

const OppsummeringSeksjon = ({ tittel, endreLabel, onEndre, harEndring, fokuser, children }: Props) => {
    const headerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (fokuser) {
            headerRef.current?.focus();
        }
    }, [fokuser]);

    return (
        <FormSummary>
            <FormSummary.Header ref={headerRef} tabIndex={fokuser ? -1 : undefined}>
                <FormSummary.Heading level="2">
                    <HStack align="center" gap="space-12">
                        {tittel}
                        {harEndring && (
                            <Tag size="small" data-color="info">
                                <AppText id="tags.endret" />
                            </Tag>
                        )}
                    </HStack>
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Value>
                        {harEndring ? (
                            children
                        ) : (
                            <BodyShort as="div">
                                <AppText id="oppsummeringStep.ingenEndringRegistrert" />
                            </BodyShort>
                        )}
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
