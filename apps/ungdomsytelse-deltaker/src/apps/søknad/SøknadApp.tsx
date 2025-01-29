import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useDeltakerContext } from '../../context/DeltakerContext';
import VelkommenMelding from './components/VelkommenMelding';
import { VStack } from '@navikt/ds-react';
import Søknadsskjema from './components/søknadsskjema/Søknadskjema';
import InformasjonOmUngdomsytelsen from './components/Informasjon';
import { useState } from 'react';
import SøknadSendtInformasjon from './components/SøknadSendtInformasjon';

const SøknadApp = () => {
    const { søker, deltakelse, barn } = useDeltakerContext();
    const [søknadSendt, setSøknadSendt] = useState(false);

    const handleOnSøknadSendt = () => {
        setSøknadSendt(true);
    };
    return (
        <Page title="Søknad om ungdomsytelse">
            {søknadSendt === false ? (
                <VStack gap="8">
                    <VelkommenMelding fornavn={søker.fornavn} startdato={deltakelse.programPeriode.from} />

                    <Søknadsskjema
                        kontonummer="3543.12.24988"
                        barn={barn}
                        startdato={deltakelse.programPeriode.from}
                        deltakelseId={deltakelse.id}
                        onSøknadSendt={handleOnSøknadSendt}
                    />
                    <InformasjonOmUngdomsytelsen />
                </VStack>
            ) : (
                <VStack gap="8">
                    <SøknadSendtInformasjon />
                </VStack>
            )}
        </Page>
    );
};

export default SøknadApp;
