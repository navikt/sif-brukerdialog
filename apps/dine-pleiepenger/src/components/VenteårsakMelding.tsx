import React from 'react';
import { Venteårsak } from '../types/Venteårsak';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import DokumentarkivLenke from './lenker/DokumentarkivLenke';

interface Props {
    venteårsak: Venteårsak;
}

const VenteårsakMelding: React.FunctionComponent<Props> = ({ venteårsak }) => {
    switch (venteårsak) {
        case Venteårsak.MEDISINSK_DOKUMENTASJON:
            return (
                <Alert variant="warning">
                    <Heading level="2" size="medium" className="text-gray-900">
                        Vi mangler legeerklæring
                    </Heading>
                    <BodyLong className="mb-2 mt-2">
                        For å vurdere behovet for tilsyn og pleie, må vi ha legeerklæring fra sykehuslege eller lege i
                        spesialisthelsetjenesten. Saken er satt på vent til vi mottar legeerklæring.
                    </BodyLong>
                    <DokumentarkivLenke tekst="Se brev i dokumentarkivet" />
                </Alert>
            );
        case Venteårsak.INNTEKTSMELDING:
            return (
                <Alert variant="warning">
                    <Heading level="2" size="medium" className="text-gray-900">
                        Vi mangler inntektsmelding fra en eller flere arbeidsgivere
                    </Heading>
                    <BodyLong className="mb-2 mt-2">
                        Vi har sendt deg brev fordi vi mangler inntektsmelding. For å beregne hvor mye pleiepenger du
                        kan få, må arbeidsgiver sende inn inntektsmelding. Saken er satt på vent til vi mottar dette.
                    </BodyLong>
                    <DokumentarkivLenke tekst="Se brev i dokumentarkivet" />
                </Alert>
            );
    }
    return null;
};
export default VenteårsakMelding;
