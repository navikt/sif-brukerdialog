import { Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import React, { useMemo, useState } from 'react';
import { Add } from '@navikt/ds-icons';
import { Sak } from '../../types/Sak';
import { Process } from '../process';
import { getStepsInBehandling } from './statusISakUtils';

interface Props {
    sak: Sak;
}

const StatusISak: React.FunctionComponent<Props> = ({ sak }) => {
    const [antallTidligere, setAntall] = useState(4);

    const { behandlinger } = sak;
    const steps = behandlinger
        .map((behandling) => getStepsInBehandling(behandling, sak.saksbehandlingsFrist))
        .flat()
        .reverse();

    const sisteBehandling = behandlinger[0];
    const andreBehandlinger = behandlinger.slice(1);

    const stepsSisteBehandling = getStepsInBehandling(sisteBehandling, sak.saksbehandlingsFrist).flat().reverse();

    const tidligereSteps = andreBehandlinger
        .map((behandling) => getStepsInBehandling(behandling, sak.saksbehandlingsFrist))
        .flat()
        .reverse();

    const totaltTidligere = useMemo(() => tidligereSteps.length, [tidligereSteps]);

    const synligTidligereSteg = tidligereSteps.slice(-1 * antallTidligere);

    const visFlereSteg = () => {
        setAntall(Math.min(steps.length, antallTidligere + 5));
    };

    return (
        <VStack gap="3">
            <Heading level="2" size="medium">
                Hva skjer i saken din nå
            </Heading>
            <Box padding="4" className="bg-white">
                <Process>{...stepsSisteBehandling.reverse()}</Process>
            </Box>
            <Heading level="2" size="medium" className="mt-10">
                Tidligere hendelser
            </Heading>
            <Box padding="4" className="bg-white">
                <Process>{...synligTidligereSteg}</Process>
            </Box>
            {antallTidligere < totaltTidligere ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary-neutral" type="button" onClick={visFlereSteg}>
                        <HStack gap="2" align="center" wrap={false}>
                            <Add role="presentation" />
                            Vis tidligere hendelser
                        </HStack>
                    </Button>
                </Box>
            ) : null}
        </VStack>
    );
};

export default StatusISak;
