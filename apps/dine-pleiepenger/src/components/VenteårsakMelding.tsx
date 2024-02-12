import React from 'react';
import { Venteårsak } from '../types/Venteårsak';
import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';

interface Props {
    venteårsak: Venteårsak;
}

const VenteårsakMelding: React.FunctionComponent<Props> = ({ venteårsak }) => (
    <Alert variant="warning">
        <Heading level="2" size="small" spacing={true}>
            Saken er satt på vent fordi vi mangler {venteårsak}.
        </Heading>
        <BodyLong className="mb-3">
            Vi har sendt deg brev fordi vi mangler inntektsmelding fra en eller flere arbeidsgivere. Inntektsmelding må
            sendes inn for at vi kan behandle saken din videre.
        </BodyLong>
        <Link href="#" variant="action">
            Se brev i dokumentarkivet <ExternalLink title="Åpnes i nytt vindu" className="ml-1" />
        </Link>
    </Alert>
);

export default VenteårsakMelding;
