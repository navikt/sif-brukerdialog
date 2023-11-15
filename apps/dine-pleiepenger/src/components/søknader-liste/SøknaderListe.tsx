import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Søknad } from '../../types/Søknad';
import { Task } from '@navikt/ds-icons';
import { FormattedMessage } from 'react-intl';

interface Props {
    søknader: Søknad[];
}

const SøknaderListe: React.FunctionComponent<Props> = ({ søknader = [] }) => {
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
                                <BodyShort as="div" size="large" className="font-bold mb-2">
                                    <HStack gap="2">
                                        <Task role="presentation" aria-hidden={true} />
                                        <FormattedMessage id={`sakstype.${søknad.søknadstype}`} />
                                    </HStack>
                                </BodyShort>
                                <BodyShort as="div" size="small">
                                    Mottatt: {dateFormatter.compact(søknad.opprettet)}
                                </BodyShort>
                            </ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>sdf</ExpansionCard.Content>
                    </ExpansionCard>
                );
            })}
        </VStack>
    );
};

export default SøknaderListe;
