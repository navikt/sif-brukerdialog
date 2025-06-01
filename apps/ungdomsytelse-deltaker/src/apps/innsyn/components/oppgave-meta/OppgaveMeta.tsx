import { BodyShort, BoxNew, HStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { BekreftelseOppgave, Oppgave } from '@navikt/ung-common';

interface Props {
    oppgave: BekreftelseOppgave | Oppgave;
}

const OppgaveMeta = ({ oppgave }: Props) => {
    const { opprettetDato, lukketDato, løstDato, åpnetDato } = oppgave;
    return (
        <BoxNew background="neutral-moderateA" padding="2" borderRadius="medium">
            <HStack gap="2">
                <BodyShort size="small">Opprettet: {dateFormatter.compactWithTime(opprettetDato)}</BodyShort>
                <BodyShort size="small">Åpnet: {åpnetDato ? dateFormatter.compactWithTime(åpnetDato) : '-'}</BodyShort>
                <BodyShort size="small">Løst: {løstDato ? dateFormatter.compactWithTime(løstDato) : '-'}</BodyShort>
                <BodyShort size="small">
                    Lukket: {lukketDato ? dateFormatter.compactWithTime(lukketDato) : '-'}
                </BodyShort>
            </HStack>
        </BoxNew>
    );
};
export default OppgaveMeta;
