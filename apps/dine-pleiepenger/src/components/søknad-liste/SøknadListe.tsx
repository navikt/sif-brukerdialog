import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';
import { Søknad } from '../../types/Søknad';
import SøknadTitle from './SøknadTitle';
import SøknadContent from './SøknadContent';
import Skeleton from 'react-loading-skeleton';
import PrettyDate from '../pretty-date/PrettyDate';
import { getSøknadMottattDato } from '../../utils/søknadUtils';

interface Props {
    søknader: Søknad[];
}

const SøknadListe: React.FunctionComponent<Props> = ({ søknader = [] }) => {
    if (søknader.length === 0) {
        return <>Ingen søknader funnet</>;
    }
    return (
        <VStack gap="2">
            {søknader.map((søknad) => {
                const labelId = `søknad-${søknad.journalpostId}`;
                return (
                    <ExpansionCard key={søknad.journalpostId} aria-labelledby={labelId}>
                        <ExpansionCard.Header>
                            <ExpansionCard.Title id={labelId}>
                                <SøknadTitle søknad={søknad} />
                            </ExpansionCard.Title>
                            <ExpansionCard.Description>
                                <BodyShort size="small">
                                    Mottatt{' '}
                                    <PrettyDate
                                        date={getSøknadMottattDato(søknad)}
                                        format="dayDateAndTime"
                                        useNorwegianTime={true}
                                    />
                                </BodyShort>
                            </ExpansionCard.Description>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <SøknadContent søknad={søknad} />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                );
            })}
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
