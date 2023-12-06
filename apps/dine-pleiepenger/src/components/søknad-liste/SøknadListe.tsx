import { Alert, Box, Button, ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import { Søknad } from '../../types/Søknad';
import SøknadTitle from './SøknadTitle';
import SøknadContent from './SøknadContent';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Add } from '@navikt/ds-icons';

interface Props {
    søknader: Søknad[];
}

const SøknadListe: React.FunctionComponent<Props> = ({ søknader = [] }) => {
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
        return <Alert variant="info">Ingen søknader funnet</Alert>;
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
                                <SøknadTitle søknad={søknad} />
                            </ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <SøknadContent søknad={søknad} />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                );
            })}
            {antall < totalt ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary-neutral" type="button" onClick={visFlereSøknader}>
                        <HStack gap="2" align="center" wrap={false}>
                            <Add role="presentation" />
                            Vis flere innsendinger
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

export default SøknadListe;
