import { BodyLong, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '../../context/DeltakerContext';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import Deltakelse from './components/Deltakelse';
import InformasjonOmUngdomsytelsen from '../søknad/components/Informasjon';
import DeltakelseHeader from './components/DeltakelseHeader';

const InnsynApp = () => {
    const { søker, deltakelse } = useDeltakerContext();

    return (
        <Page title="Din ungdomsytelse">
            <VStack gap="8">
                <VStack gap="8">
                    <VStack gap="2">
                        <DeltakelseHeader deltakelse={deltakelse} />
                    </VStack>
                    {1 + 1 === 3 ? (
                        <GuidePanel poster={false}>
                            <Heading level="1" size="medium" spacing={true}>
                                Hei {søker.fornavn}!
                            </Heading>
                            <BodyLong size="large">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat maxime hic distinctio
                                aut quia, beatae optio, suscipit obcaecati a sit reiciendis.
                            </BodyLong>
                        </GuidePanel>
                    ) : null}
                </VStack>

                <Deltakelse deltakelse={deltakelse} />

                <InformasjonOmUngdomsytelsen />
            </VStack>
        </Page>
    );
};

export default InnsynApp;
