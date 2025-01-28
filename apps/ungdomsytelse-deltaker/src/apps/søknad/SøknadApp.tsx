import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useDeltakerContext } from '../../context/DeltakerContext';
import VelkommenMelding from './components/VelkommenPage';
import { VStack } from '@navikt/ds-react';
import Søknadsskjema from './components/Søknadskjema';

const SøknadApp = () => {
    const { søker, deltakelse, barn } = useDeltakerContext();
    return (
        <Page title="Søknad om ungdomsytelse">
            <VStack gap="8">
                <VelkommenMelding fornavn={søker.fornavn} startdato={deltakelse.programPeriode.from} />
                <Søknadsskjema kontonummer="3543.12.24988" barn={barn} />
            </VStack>
        </Page>
    );
};

export default SøknadApp;
