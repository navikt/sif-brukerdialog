import { PlusIcon } from '@navikt/aksel-icons';
import { Alert, Box, Button, ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AppText } from '../../i18n';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import InnsendtSøknadContent from './InnsendtSøknadContent';
import InnsendtSøknadTitle from './InnsendtSøknadTitle';

interface Props {
    søknader: InnsendtSøknad[];
}

const InnsendtSøknadListe = ({ søknader = [] }: Props) => {
    const [antall, setAntall] = useState(3);
    const [focusIndex, setFocusIndex] = useState<number | undefined>();

    const totalt = useMemo(() => søknader.length, [søknader]);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (focusIndex && ref.current) {
            ref.current.focus();
            setFocusIndex(undefined);
        }
    }, [antall, focusIndex]);

    if (søknader.length === 0) {
        return (
            <Alert variant="info">
                <AppText id="innsendtSøknadListe.ingenSøknader" />
            </Alert>
        );
    }

    const visFlereSøknader = () => {
        setFocusIndex(antall);
        setAntall(Math.min(søknader.length, antall + 5));
    };

    return (
        <VStack gap="2">
            {søknader.slice(0, antall).map((søknad, index) => {
                const labelId = `søknad-${søknad.journalpostId}`;
                return (
                    <ExpansionCard
                        tabIndex={-1}
                        ref={index === focusIndex ? ref : undefined}
                        key={søknad.journalpostId}
                        aria-labelledby={labelId}>
                        <ExpansionCard.Header>
                            <ExpansionCard.Title id={labelId}>
                                <InnsendtSøknadTitle søknad={søknad} />
                            </ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <InnsendtSøknadContent søknad={søknad} />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                );
            })}
            {antall < totalt ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary-neutral" type="button" onClick={visFlereSøknader}>
                        <HStack gap="2" align="center" wrap={false}>
                            <PlusIcon role="presentation" />
                            <AppText id="innsendtSøknadListe.visFlereInnsendinger" />
                        </HStack>
                    </Button>
                </Box>
            ) : null}
        </VStack>
    );
};

export default InnsendtSøknadListe;
