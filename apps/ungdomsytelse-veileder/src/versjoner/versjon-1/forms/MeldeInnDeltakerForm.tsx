import { Heading, List } from '@navikt/ds-react';

interface Props {}

const MeldeInnDeltakerForm = ({}: Props) => (
    <>
        <Heading level="3" size="small" spacing={true}>
            Params
        </Heading>
        <List>
            <List.Item>
                <code>startdato</code>
                <List>
                    <List.Item>Ikke lørdag eller søndag</List.Item>
                    <List.Item>Etter innmeldingsdato</List.Item>
                </List>
            </List.Item>
        </List>
    </>
);

export default MeldeInnDeltakerForm;
