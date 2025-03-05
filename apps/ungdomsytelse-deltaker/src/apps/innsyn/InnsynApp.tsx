import { VStack } from '@navikt/ds-react';
import { useDeltakerContext } from '../../context/DeltakerContext';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import DeltakelseContent from './components/DeltakelseContent';
import InformasjonOmUngdomsytelsen from '../søknad/components/Informasjon';
import DeltakelseHeader from './components/DeltakelseHeader';

const InnsynApp = () => {
    const { deltakelse } = useDeltakerContext();

    return (
        <Page title="Din ungdomsytelse">
            <VStack gap="8">
                <VStack gap="8">
                    <VStack gap="2">
                        <DeltakelseHeader deltakelse={deltakelse} />
                    </VStack>
                </VStack>

                <DeltakelseContent deltakelse={deltakelse} />

                <InformasjonOmUngdomsytelsen />
            </VStack>
        </Page>
    );
};

export default InnsynApp;
