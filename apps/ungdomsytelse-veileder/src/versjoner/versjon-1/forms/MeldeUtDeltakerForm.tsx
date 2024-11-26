import { Heading, List } from '@navikt/ds-react';

interface Props {
    deltakerId: string;
}

const MeldeUtDeltakerForm = ({}: Props) => {
    const meldUtDeltaker = async () => {};

    return (
        <form action="#" onSubmit={meldUtDeltaker}>
            <Heading level="3" size="small" spacing={true}>
                Meld ut deltaker
            </Heading>

            <List>
                <List.Item>
                    <code>deltakelseId</code>
                </List.Item>
                <List.Item>
                    <code>utmeldingsdato</code>
                    <List>
                        <List.Item>Ikke lørdag eller søndag</List.Item>
                        <List.Item>Etter innmeldingsdato</List.Item>
                    </List>
                </List.Item>
            </List>
        </form>
    );
};

export default MeldeUtDeltakerForm;
