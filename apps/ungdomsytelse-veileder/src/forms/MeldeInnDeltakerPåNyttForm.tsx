import { Heading, List } from '@navikt/ds-react';

interface Props {
    deltakerFnr: string;
}

const MeldeInnDeltakerPåNyttForm = ({}: Props) => (
    <>
        <Heading level="3" size="small" spacing={true}>
            Params
        </Heading>
        <List>
            <List.Item>
                <code>deltakelseId</code>
            </List.Item>
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

export default MeldeInnDeltakerPåNyttForm;
