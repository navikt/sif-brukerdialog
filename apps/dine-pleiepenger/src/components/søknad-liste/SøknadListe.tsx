import { ExpansionCard, VStack } from '@navikt/ds-react';
import { Søknad } from '../../types/Søknad';
import SøknadTitle from './SøknadTitle';
import SøknadContent from './SøknadContent';

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

export default SøknadListe;
