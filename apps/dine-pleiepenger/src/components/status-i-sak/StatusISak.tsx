import { Box, Heading, Link, VStack } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';

import React, { useMemo } from 'react';
import { Sak } from '../../types/Sak';
import { Process } from '../process';
import { getStepsInBehandling } from './statusISakUtils';
import { default as NextLink } from 'next/link';

interface Props {
    sak: Sak;
    visAlleHendelser?: boolean;
}

const StatusISak: React.FunctionComponent<Props> = ({ sak, visAlleHendelser }) => {
    const { behandlinger } = sak;
    const steps = behandlinger
        .map((behandling) => getStepsInBehandling(behandling, sak.saksbehandlingsFrist))
        .flat()
        .reverse();

    const totalt = useMemo(() => steps.length, [steps]);

    // const [antall, setAntall] = useState(visAlleHendelser ? totalt : 4);

    /** Skille mellom siste og tidligere behandlinger */
    /*
    const sisteBehandling = behandlinger[0];
    const andreBehandlinger = behandlinger.slice(1);
    const stepsSisteBehandling = getStepsInBehandling(sisteBehandling, sak.saksbehandlingsFrist).flat().reverse();
    const tidligereSteps = andreBehandlinger
        .map((behandling) => getStepsInBehandling(behandling, sak.saksbehandlingsFrist))
        .flat()
        .reverse();
    const totaltTidligere = useMemo(() => tidligereSteps.length, [tidligereSteps]);
    const synligTidligereSteg = tidligereSteps.slice(-1 * antallTidligere);
    */
    // const totalt = useMemo(() => steps.length, [steps]);
    // const synligeSteps = steps.slice(-1 * antall);
    // const visFlereSteg = () => {
    //     setAntall(Math.min(steps.length, antall + 5));
    // };

    return (
        <VStack gap="3">
            <Heading level="2" size="medium">
                Dette skjer i saken din
            </Heading>
            <Box padding="4" className="bg-white">
                <Process>{visAlleHendelser ? [...steps] : [...steps.reverse()]}</Process>
            </Box>
            {/* {synligeSteps.length === 0 ? null : (
                <>
                    {antall < totalt ? (
                        <Box className="flex justify-start">
                            <Button variant="tertiary-neutral" type="button" onClick={visFlereSteg}>
                                <HStack gap="2" align="center" wrap={false}>
                                    <Add role="presentation" />
                                    Vis tidligere hendelser
                                </HStack>
                            </Button>
                        </Box>
                    ) : null}
                </>
            )} */}
            {(4 < totalt || 1 + 1 === 2) && visAlleHendelser === undefined ? (
                <Box className="ml-4">
                    <Link as={NextLink} href={`/sak/${sak.saksnummer}/historikk`}>
                        Se alle hendelser
                        <ChevronRightIcon role="presentation" />
                    </Link>
                </Box>
            ) : null}
        </VStack>
    );
};

export default StatusISak;
