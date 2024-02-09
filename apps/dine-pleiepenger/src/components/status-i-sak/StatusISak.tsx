import React, { useMemo, useState } from 'react';
import { Sak } from '../../types/Sak';
import { Box, Button, HStack, Heading, Panel, VStack } from '@navikt/ds-react';
import { Process } from '../process';
import { getStepsInBehandling } from './statusISakUtils';
import { Add } from '@navikt/ds-icons';
import { getBehandlingerISakSorted } from '../../utils/sakUtils';

interface Props {
    sak: Sak;
}

const StatusISak: React.FunctionComponent<Props> = ({ sak }) => {
    const [antall, setAntall] = useState(4);

    const behandlinger = getBehandlingerISakSorted(sak);
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

    const totalt = useMemo(() => steps.length, [steps]);

    // const visibleSteps = steps.slice(-1 * antall);

    const visFlereSteg = () => {
        setAntall(Math.min(steps.length, antall + 5));
    };

    return (
        <VStack gap="3">
            <Heading level="2" size="medium">
                Hva skjer i saken din nå
            </Heading>
            <Panel className="bg-white">
                <Process>{...stepsSisteBehandling.reverse()}</Process>
            </Panel>
            <Heading level="2" size="medium" className="mt-10">
                Tidligere hendelser
            </Heading>
            <Panel className="bg-white">
                <Process>{...tidligereSteps}</Process>
            </Panel>
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
        </VStack>
    );
};

export default StatusISak;
