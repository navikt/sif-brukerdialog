import { BodyLong, Box, Button, Checkbox, CheckboxGroup, Link, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useDeltakerContext } from '../../../context/DeltakerContext';
import SøknadHeader from '../components/søknad-header/SøknadHeader';
import VelkommenMelding from '../components/VelkommenMelding';
import { Spørsmål, useSøknadContext } from '../context/søknadContext';

const VelkommenSteg = () => {
    const { søker, deltakelse } = useDeltakerContext();
    const { startSøknad, svar } = useSøknadContext();

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
        <Page title="Velkommen - Søknad om ungdomsytelse">
            <VStack gap="8">
                <SøknadHeader tittel="Søknad om ungdomsytelse" />

                <VelkommenMelding fornavn={søker.fornavn} startdato={deltakelse.programPeriode.from} />

                <div>
                    <BodyLong>
                        Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.{' '}
                        <Link href="https://www.nav.no/endringer">
                            Les mer om viktigheten av å gi riktige opplysninger.
                        </Link>
                    </BodyLong>
                    <Box paddingBlock="4 8">
                        <CheckboxGroup error={error} name="bekreftelse" legend="Bekreftelse" hideLegend={true}>
                            <Checkbox
                                value="bekrefter"
                                onChange={(evt) => {
                                    setError(undefined);
                                    setInfoStemmer(evt.target.checked);
                                }}>
                                Jeg bekrefter at jeg vil svare så riktig som jeg kan
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
