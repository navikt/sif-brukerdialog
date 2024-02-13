import { HGrid, Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';

interface Props {}

const SnarveierSak: React.FunctionComponent<Props> = ({}) => (
    <>
        <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
            Snarveier
        </Heading>
        <HGrid gap="2" columns={3}>
            <LinkPanel href="/" border={false}>
                <Heading as="div" level="3" size="small">
                    Dokumentarkiv
                </Heading>
            </LinkPanel>
            <LinkPanel href="/" border={false}>
                <Heading as="div" level="3" size="small">
                    Utbetalinger
                </Heading>
            </LinkPanel>
            <LinkPanel href="/" border={false}>
                <Heading as="div" level="3" size="small">
                    Om pleiepenger
                </Heading>
            </LinkPanel>
        </HGrid>
    </>
);

export default SnarveierSak;
