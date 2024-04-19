import React, { ReactNode } from 'react';
import { Venteårsak } from '../../types/Venteårsak';
import { Alert, BodyLong, Box, Button, Heading } from '@navikt/ds-react';
import DokumentarkivLenke from '../lenker/DokumentarkivLenke';
import Link from 'next/link';
import { browserEnv } from '../../utils/env';
import { Msg } from '../../i18n';

interface Props {
    venteårsak: Venteårsak;
}

const MeldingHeading = ({ children }: { children: ReactNode }) => (
    <Heading level="2" size="small" className="text-gray-900">
        {children}
    </Heading>
);

const VenteårsakMelding: React.FunctionComponent<Props> = ({ venteårsak }) => {
    switch (venteårsak) {
        case Venteårsak.MEDISINSK_DOKUMENTASJON:
            return (
                <>
                    <Alert variant="warning">
                        <MeldingHeading>
                            <Msg id="venteårsakMelding.legeerklæring.tittel" />
                        </MeldingHeading>
                        <BodyLong className="mb-2 mt-2">
                            <Msg
                                id="venteårsakMelding.legeerklæring.info"
                                values={{
                                    lenke: (text) => <DokumentarkivLenke tekst={text} />,
                                }}
                            />
                        </BodyLong>
                        <Box className="mt-4">
                            <Button as={Link} variant="primary" href={browserEnv.NEXT_PUBLIC_SKJEMA_ETTERSENDELSE_URL}>
                                <Msg id="venteårsakMelding.legeerklæring.lastOppHer" />
                            </Button>
                        </Box>
                    </Alert>
                </>
            );
        case Venteårsak.INNTEKTSMELDING:
            return (
                <Alert variant="warning">
                    <MeldingHeading>
                        <Msg id="venteårsakMelding.inntektsmelding.tittel" />
                    </MeldingHeading>
                    <BodyLong className="mb-2 mt-2">
                        <Msg id="venteårsakMelding.inntektsmelding.info" />
                    </BodyLong>
                    <Msg
                        id="venteårsakMelding.inntektsmelding.dokumentarkivLenke"
                        values={{
                            lenke: (txt) => <DokumentarkivLenke tekst={txt} />,
                        }}
                    />
                </Alert>
            );
        case Venteårsak.SØKT_FOR_TIDLIG:
            return (
                <Alert variant="info">
                    <MeldingHeading>
                        <Msg id="venteårsakMelding.søktForTidlig.tittel" values={{ dato: <span>[todo]</span> }} />
                    </MeldingHeading>
                    <BodyLong className="mb-2 mt-2">
                        <Msg id="venteårsakMelding.søktForTidlig.info" />
                    </BodyLong>
                </Alert>
            );

        case Venteårsak.MELDEKORT:
            return (
                <Alert variant="info">
                    <MeldingHeading>
                        <Msg id="venteårsakMelding.meldekort.tittel" />
                    </MeldingHeading>
                    <BodyLong className="mb-2 mt-2">
                        <Msg id="venteårsakMelding.meldekort.info" />
                    </BodyLong>
                </Alert>
            );
    }
};
export default VenteårsakMelding;
