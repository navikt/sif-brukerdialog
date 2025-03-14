import { Bleed, Heading, HGrid, HStack, Switch, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import InfoBox from '../info-box/InfoBox';

interface Props {
    children: React.ReactNode;
    info?: React.ReactNode;
    header: React.ReactNode;
}

const SectionContainer = ({ header, info, children }: Props) => {
    const [visInfo, setVisInfo] = useState(false);
    return (
        <VStack gap="2">
            <HGrid columns="1fr auto" align="center">
                <Heading level="3" size="medium">
                    {header}
                </Heading>
                {info ? (
                    <Bleed marginBlock="2 2">
                        <Switch size="small" checked={visInfo} onChange={(evt) => setVisInfo(evt.target.checked)}>
                            Vis info
                        </Switch>
                    </Bleed>
                ) : null}
            </HGrid>
            <InfoBox visible={visInfo}>{info}</InfoBox>
            <HStack className="bg-gray-50 p-5 rounded-md" gap="4">
                {children}
            </HStack>
        </VStack>
    );
};

export default SectionContainer;
