import { BodyShort, Box, Button, ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Add } from '@navikt/ds-icons';
import { Oppgave } from '@navikt/ung-common';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import { getOppgaveTittel } from '../../utils/textUtils';
import { useAppIntl } from '../../i18n';

interface Props {
    oppgaver: Oppgave[];
}

const LøsteOppgaver = ({ oppgaver }: Props) => {
    const [antall, setAntall] = useState(2);
    const [focusIndex, setFocusIndex] = useState<number | undefined>();
    const ref = useRef<HTMLDivElement>(null);
    const intl = useAppIntl();

    useEffect(() => {
        if (focusIndex && ref.current) {
            ref.current.focus();
            setFocusIndex(undefined);
        }
    }, [antall, focusIndex]);

    if (oppgaver.length === 0) {
        return null;
    }

    const totalt = useMemo(() => oppgaver.length, oppgaver);

    const visFlere = () => {
        setFocusIndex(antall);
        setAntall(Math.min(oppgaver.length, antall + 3));
    };

    return (
        <VStack gap="2">
            {oppgaver.slice(0, antall).map((oppgave, index) => {
                return (
                    <ExpansionCard
                        size="small"
                        aria-label={oppgave.oppgavetype}
                        key={oppgave.opprettetDato.toISOString()}
                        ref={index === focusIndex ? ref : undefined}>
                        <ExpansionCard.Header>
                            <VStack gap="2">
                                <ExpansionCard.Title size="small">
                                    {getOppgaveTittel(oppgave, intl)} -{' '}
                                    <AppText id={`oppgavestatus.${oppgave.status}`} />
                                </ExpansionCard.Title>
                                <BodyShort as="div" size="small">
                                    <HStack gap="4">
                                        <Box>
                                            <BodyShort size="small" as="span">
                                                {dateFormatter.compact(oppgave.opprettetDato)}
                                            </BodyShort>
                                        </Box>
                                    </HStack>
                                </BodyShort>
                            </VStack>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>TODO</ExpansionCard.Content>
                    </ExpansionCard>
                );
            })}
            {antall < totalt ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary" type="button" onClick={visFlere}>
                        <HStack gap="2" align="center" wrap={false}>
                            <Add role="presentation" />
                            Vis flere perioder
                        </HStack>
                    </Button>
                </Box>
            ) : null}
        </VStack>
    );
};

export default LøsteOppgaver;
