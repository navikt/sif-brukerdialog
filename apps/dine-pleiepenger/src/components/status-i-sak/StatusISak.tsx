import React, { useMemo, useState } from 'react';
import { Sak } from '../../types/Sak';
import { Box, Button, HStack, Heading, Panel, VStack } from '@navikt/ds-react';
import { Process } from '../process';
import { getStepsInBehandling } from './statusISakUtils';
import { Add } from '@navikt/ds-icons';

interface Props {
    sak: Sak;
}

const StatusISak: React.FunctionComponent<Props> = ({ sak }) => {
    const [antall, setAntall] = useState(4);
    // const [focusIndex, setFocusIndex] = useState<number | undefined>();

    const steps = sak.behandlinger
        .map((behandling) => getStepsInBehandling(behandling, sak.saksbehandlingsFrist))
        .flat();

    const totalt = useMemo(() => steps.length, [steps]);

    const visibleSteps = steps.slice(-1 * antall);

    const visFlereSteg = () => {
        // setFocusIndex(antall);
        setAntall(Math.min(steps.length, antall + 5));
    };

    return (
        <VStack gap="3">
            <Heading level="2" size="medium">
                Status i saken
            </Heading>
            <Panel className="bg-white">
                <Process>{...visibleSteps}</Process>
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
