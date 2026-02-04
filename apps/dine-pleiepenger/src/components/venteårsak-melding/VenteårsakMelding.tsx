import { Alert, BodyLong, Box, Button, Heading, ReadMore, VStack } from '@navikt/ds-react';
import Link from 'next/link';

import { AppText, useAppIntl } from '../../i18n';
import { Venteårsak } from '../../types';
import { browserEnv } from '../../utils/env';
import DokumentarkivLenke from '../lenker/DokumentarkivLenke';

interface Props {
    venteårsak: Venteårsak;
}

const VenteårsakMelding = ({ venteårsak }: Props) => {
    const { text } = useAppIntl();
    switch (venteårsak) {
        case Venteårsak.MEDISINSK_DOKUMENTASJON:
            return (
                <Alert variant="warning">
                    <Heading level="2" size="small" spacing>
                        <AppText id="venteårsakMelding.legeerklæring.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <AppText
                            id="venteårsakMelding.legeerklæring.info"
                            values={{
                                lenke: (text: string) => <DokumentarkivLenke tekst={text} />,
                            }}
                        />
                    </BodyLong>
                    <Box>
                        <Button as={Link} variant="primary" href={browserEnv.NEXT_PUBLIC_SKJEMA_ETTERSENDELSE_URL}>
                            <AppText id="venteårsakMelding.legeerklæring.lastOppHer" />
                        </Button>
                    </Box>
                </Alert>
            );
        case Venteårsak.INNTEKTSMELDING:
            return (
                <Alert variant="warning">
                    <Heading level="2" size="small" spacing>
                        <AppText id="venteårsakMelding.inntektsmelding.tittel" />
                    </Heading>
                    <VStack gap="space-16">
                        <BodyLong>
                            <AppText id="venteårsakMelding.inntektsmelding.info.1" />
                        </BodyLong>
                        <ReadMore
                            header={text('venteårsakMelding.inntektsmelding.readMore.tittel')}
                            data-color="accent">
                            <BodyLong>
                                <AppText id="venteårsakMelding.inntektsmelding.readMore.tekst.1" />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="venteårsakMelding.inntektsmelding.readMore.tekst.2" />
                            </BodyLong>
                        </ReadMore>
                    </VStack>
                </Alert>
            );
        case Venteårsak.FOR_TIDLIG_SOKNAD:
            return (
                <Alert variant="info">
                    <Heading level="2" size="small" spacing>
                        <AppText id="venteårsakMelding.søktForTidlig.tittel" values={{ dato: <span>[todo]</span> }} />
                    </Heading>
                    <BodyLong>
                        <AppText id="venteårsakMelding.søktForTidlig.info" />
                    </BodyLong>
                </Alert>
            );

        case Venteårsak.MELDEKORT:
            return (
                <Alert variant="info">
                    <Heading level="2" size="small" spacing>
                        <AppText id="venteårsakMelding.meldekort.tittel" />
                    </Heading>
                    <BodyLong>
                        <AppText id="venteårsakMelding.meldekort.info" />
                    </BodyLong>
                </Alert>
            );
    }
};
export default VenteårsakMelding;
