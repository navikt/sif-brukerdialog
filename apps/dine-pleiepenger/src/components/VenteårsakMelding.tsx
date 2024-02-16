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
        case Venteårsak.SØKT_FOR_TIDLIG:
            return (
                <Alert variant="info">
                    <Heading level="2" size="medium" className="text-gray-900">
                        Vi kan tidligst behandle søknaden din XX.XX.XXXX
                    </Heading>
                    <BodyLong className="mb-2 mt-2">
                        For å beregne hvor mye pleiepenger du kan få, trenger vi ferske opplysninger om inntekten din.
                        Arbeidsgiver kan derfor sende inntektsopplysninger tidligst 4 uker før pleiepengeperioden din
                        starter. Saken er satt på vent frem til søknaden kan behandles.
                    </BodyLong>
                </Alert>
            );

        case Venteårsak.MELDEKORT:
            return (
                <Alert variant="info">
                    <Heading level="2" size="medium" className="text-gray-900">
                        Vi venter på at du sender meldekort
                    </Heading>
                    <BodyLong className="mb-2 mt-2">
                        Vi kan først behandle søknaden din når siste meldekort er sendt inn i dagpengesaken eller
                        arbeidsavklarings&shy;pengesaken din. Du må sende inn meldekort helt frem til du starter
                        perioden med pleiepenger.
                    </BodyLong>
                </Alert>
            );
    }
};
export default VenteårsakMelding;
