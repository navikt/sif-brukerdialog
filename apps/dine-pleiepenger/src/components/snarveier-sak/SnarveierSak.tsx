import { HGrid, Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { browserEnv } from '../../utils/env';

interface Props {}

const SnarveierSak: React.FunctionComponent<Props> = ({}) => (
    <>
        <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
            Snarveier
        </Heading>
        <HGrid gap="2" columns={{ xs: 1, md: 3 }}>
            <LinkPanel href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL} border={false}>
                <Heading as="div" level="3" size="small">
                    Dokumentarkiv
                </Heading>
            </LinkPanel>
            <LinkPanel href={browserEnv.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL} border={false}>
                <Heading as="div" level="3" size="small">
                    Utbetalinger
                </Heading>
            </LinkPanel>
            <LinkPanel href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_INFO_URL} border={false}>
                <Heading as="div" level="3" size="small">
                    Om pleiepenger
                </Heading>
            </LinkPanel>
        </HGrid>
    </>
);

export default SnarveierSak;
