import { BodyLong, Heading } from '@navikt/ds-react';
import { Søker } from '@navikt/sif-common';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds/src';

interface Props {
    søker: Søker;
    startSøknad: () => void;
}

const VelkommenPage = ({ søker, startSøknad }: Props) => (
    <SoknadVelkommenPage
        title="Ungdomsytelse"
        guide={{
            navn: søker.fornavn,
            content: <BodyLong size="large">Velkommen skal du være</BodyLong>,
        }}
        onStartSøknad={startSøknad}>
        <Heading level="3" size="medium" spacing={true}>
            Informasjon om søknaden
        </Heading>
        <BodyLong>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
        </BodyLong>
    </SoknadVelkommenPage>
);

export default VelkommenPage;
