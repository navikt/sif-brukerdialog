import { Heading, HGrid, LinkPanel } from '@navikt/ds-react';
import { AppText } from '../../i18n';
import { browserEnv } from '../../utils/env';

const SnarveierSak = () => (
    <>
        <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
            <AppText id="snarveierSak.tittel" />
        </Heading>
        <HGrid gap="2" columns={{ xs: 1, md: 3 }}>
            <LinkPanel href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL} border={false}>
                <Heading as="div" level="3" size="small">
                    <AppText id="snarveierSak.dokumentarkiv" />
                </Heading>
            </LinkPanel>
            <LinkPanel href={browserEnv.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL} border={false}>
                <Heading as="div" level="3" size="small">
                    <AppText id="snarveierSak.utbetalinger" />
                </Heading>
            </LinkPanel>
            <LinkPanel href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_INFO_URL} border={false}>
                <Heading as="div" level="3" size="small">
                    <AppText id="snarveierSak.omPleiepenger" />
                </Heading>
            </LinkPanel>
        </HGrid>
    </>
);

export default SnarveierSak;
