import React from 'react';
import { Sak } from '../../types/Sak';
import { Heading, Panel, VStack } from '@navikt/ds-react';
import { Process } from '../process';
import ProcessStep from '../process/ProcessStep';
import CompleteIcon from '../process/checks/Complete';

interface Props {
    sak: Sak;
}

const StatusISak: React.FunctionComponent<Props> = ({}) => {
    return (
        <VStack gap="3">
            <Heading level="2" size="medium">
                Status i saken
            </Heading>
            <Panel className="bg-white">
                <Process>
                    <ProcessStep completed={true} variant="CURRENT" icon={<CompleteIcon />}>
                        <Heading size="small" level="3">
                            Du søkte om pleiepenger for sykt barn
                        </Heading>
                        <p>13.09.2023 kl. 17.05</p>
                    </ProcessStep>
                    <ProcessStep completed={false} className="whoa">
                        <Heading size="small" level="3">
                            Søknaden er ferdig behandlet
                        </Heading>
                        Inntektsmelding fra arbeidsgiver og legeerklæring må være sendt inn for at vi kan behandle
                        saken.
                    </ProcessStep>
                </Process>
            </Panel>
        </VStack>
    );
};

export default StatusISak;
