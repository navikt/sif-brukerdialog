import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, Checkbox, CheckboxGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import ExternalLink from '../../components/external-link/ExternalLink';
import SøknadHeader from '../components/søknad-header/SøknadHeader';
import VelkommenMelding from '../components/VelkommenMelding';
import { useSøknadContext } from '../hooks/context/useSøknadContext';
import { Spørsmål } from '../types';
import { AppText, useAppIntl } from '../../i18n';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import getLenker from '../../utils/lenker';

const VelkommenPage = () => {
    const { text } = useAppIntl();
    const { søker, startSøknad, svar } = useSøknadContext();

    const [infoStemmer, setInfoStemmer] = useState<boolean>(svar[Spørsmål.FORSTÅR_PLIKTER] || false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (infoStemmer) {
            setLoading(true);
            startSøknad(infoStemmer);
        } else {
            setError(text('velkommenPage.validering.bekrefterIkkeValgt'));
        }
    };

    return (
        <DefaultPageLayout documentTitle={text('søknad.tittel')}>
            <VStack gap="space-32">
                <SøknadHeader />

                <VelkommenMelding fornavn={søker.fornavn} />

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

                        <Box paddingBlock="space-16 space-32">
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

                        <Button
                            variant="primary"
                            icon={<ArrowRightIcon aria-hidden />}
                            iconPosition="right"
                            loading={loading}>
                            <AppText id="velkommenPage.startSøknad" />
                        </Button>
                    </form>
                </div>
            </VStack>
        </DefaultPageLayout>
    );
};

export default VelkommenPage;
