import { BodyLong, Box, Button, Checkbox, CheckboxGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SøknadHeader from '../components/søknad-header/SøknadHeader';
import VelkommenMelding from '../components/VelkommenMelding';
import { useSøknadContext } from '../hooks/context/useSøknadContext';
import { Spørsmål } from '../types';
import ExternalLink from '../components/external-link/ExternalLink';

const VelkommenSteg = () => {
    const { søker, deltakelsePeriode, startSøknad, svar } = useSøknadContext();

    const [infoStemmer, setInfoStemmer] = useState<boolean>(svar[Spørsmål.FORSTÅR_PLIKTER] || false);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!infoStemmer) {
            setError('Du må bekrefte at du vil svare så riktig som du kan.');
            return;
        } else {
            startSøknad(infoStemmer);
        }
    };

    return (
        <Page title="Velkommen - Søknad om ungdomsprogramytelse">
            <VStack gap="8">
                <SøknadHeader />

                <VelkommenMelding fornavn={søker.fornavn} startdato={deltakelsePeriode.programPeriode.from} />

                <div>
                    <BodyLong>
                        Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.{' '}
                        <ExternalLink href="https://www.nav.no/endringer">
                            Les mer om viktigheten av å gi riktige opplysninger.
                        </ExternalLink>
                    </BodyLong>
                    <Box paddingBlock="4 8">
                        <CheckboxGroup error={error} name="bekreftelse" legend="Bekreftelse" hideLegend={true}>
                            <Checkbox
                                value="bekrefter"
                                onChange={(evt) => {
                                    setError(undefined);
                                    setInfoStemmer(evt.target.checked);
                                }}>
                                Jeg vil svare så godt jeg kan på spørsmålene i søknaden.
                            </Checkbox>
                        </CheckboxGroup>
                    </Box>
                    <form onSubmit={(evt) => handleSubmit(evt)}>
                        <Button variant="primary" icon={<ArrowRightIcon aria-hidden />} iconPosition="right">
                            Start søknad
                        </Button>
                    </form>
                </div>
            </VStack>
        </Page>
    );
};

export default VelkommenSteg;
