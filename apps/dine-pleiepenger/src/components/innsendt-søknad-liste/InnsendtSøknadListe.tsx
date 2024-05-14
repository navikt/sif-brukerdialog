import { Alert, Box, Button, ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import InnsendtSøknadTitle from './InnsendtSøknadTitle';
import InnsendtSøknadContent from './InnsendtSøknadContent';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Add } from '@navikt/ds-icons';
import { Msg } from '../../i18n';

interface Props {
    søknader: InnsendtSøknad[];
}

const InnsendtSøknadListe: React.FunctionComponent<Props> = ({ søknader = [] }) => {
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
                <Msg id="innsendtSøknadListe.ingenSøknader" />
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
                        className="shadow"
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
                            <Add role="presentation" />
                            <Msg id="innsendtSøknadListe.visFlereInnsendinger" />
                        </HStack>
                    </Button>
                </Box>
            ) : null}
        </VStack>
    );
};

export const SøknadListeSkeleton = ({ rows = 3 }: { rows: number }) => {
    const skeleton: any[] = [];
    for (let i = 0; i < rows; i++) {
        const card = (
            <Skeleton
                key={i}
                height={'5.9rem'}
                baseColor="#ffffff"
                highlightColor="#99C4DD"
                style={{ borderRadius: '.5rem' }}
                containerClassName="flex"
                className="border border-gray-500"
            />
        );
        skeleton.push(card);
    }
    return <VStack gap="2">{skeleton}</VStack>;
};

export default InnsendtSøknadListe;
