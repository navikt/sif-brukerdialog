import { Heading, HGrid, LinkPanel } from '@navikt/ds-react';

const SnarveierSak = () => (
    <>
        <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
            Mer informasjon om ungdomsytelsen
        </Heading>
        <HGrid gap="2" columns={{ xs: 1, md: 3 }}>
            <LinkPanel href={'#'} border={false}>
                <Heading as="div" level="3" size="small">
                    Om ungdomsytelsen
                </Heading>
            </LinkPanel>
            <LinkPanel href={'#'} border={false}>
                <Heading as="div" level="3" size="small">
                    Om inntekt
                </Heading>
            </LinkPanel>
            <LinkPanel href={'#'} border={false}>
                <Heading as="div" level="3" size="small">
                    Om oppfølging fra veileder
                </Heading>
            </LinkPanel>
        </HGrid>
    </>
);

export default SnarveierSak;
