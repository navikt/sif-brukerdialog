import { BodyLong, Box, Button, Checkbox, CheckboxGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../utils/lenker';
import DefaultPageLayout from '../../innsyn/pages/layout/DefaultPageLayout';
import ExternalLink from '../components/external-link/ExternalLink';
import SøknadHeader from '../components/søknad-header/SøknadHeader';
import VelkommenMelding from '../components/VelkommenMelding';
import { useSøknadContext } from '../hooks/context/useSøknadContext';
import { Spørsmål } from '../types';

const VelkommenPage = () => {
    const { text } = useAppIntl();
    const { søker, deltakelsePeriode, startSøknad, svar } = useSøknadContext();

    const [infoStemmer, setInfoStemmer] = useState<boolean>(svar[Spørsmål.FORSTÅR_PLIKTER] || false);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!infoStemmer) {
            setError(text('velkommenPage.validering.bekrefterIkkeValgt'));
            return;
        } else {
            startSøknad(infoStemmer);
        }
    };

    return (
        <DefaultPageLayout documentTitle={text('søknad.tittel')}>
            <VStack gap="8">
                <SøknadHeader />

                <VelkommenMelding fornavn={søker.fornavn} startdato={deltakelsePeriode.programPeriode.from} />

                <div>
                    <form onSubmit={handleSubmit}>
                        <BodyLong>
                            <AppText
                                id="velkommenPage.infoStemmer"
                                values={{
                                    Lenke: (children: string) => (
                                        <ExternalLink href={getLenker().rettOgPlikt}>{children}</ExternalLink>
                                    ),
                                }}
                            />
                        </BodyLong>

                        <Box paddingBlock="4 8">
                            <CheckboxGroup
                                error={error}
                                name="bekreftelse"
                                legend={text('velkommenPage.bekreftelse.skjultLegend')}
                                hideLegend={true}>
                                <Checkbox
                                    value="bekrefter"
                                    onChange={(evt) => {
                                        setError(undefined);
                                        setInfoStemmer(evt.target.checked);
                                    }}>
                                    <AppText id="velkommenPage.bekrefter" />
                                </Checkbox>
                            </CheckboxGroup>
                        </Box>

                        <Button variant="primary" icon={<ArrowRightIcon aria-hidden />} iconPosition="right">
                            <AppText id="velkommenPage.startSøknad" />
                        </Button>
                    </form>
                </div>
            </VStack>
        </DefaultPageLayout>
    );
};

export default VelkommenPage;
