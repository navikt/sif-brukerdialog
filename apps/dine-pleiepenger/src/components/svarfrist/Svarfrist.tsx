'use client';
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Venteårsak } from '../../types/Venteårsak';
import { browserEnv } from '../../utils/env';

interface Props {
    frist?: Date;
    saksbehandlingstidUker?: number;
    venteårsak?: Venteårsak;
}

const getFristTekst = (frist: Date, venteårsak?: Venteårsak): React.ReactNode => {
    switch (venteårsak) {
        case Venteårsak.INNTEKTSMELDING:
        case Venteårsak.MEDISINSK_DOKUMENTASJON:
            return (
                <>
                    Fordi vi mangler dokumenter kan saksbehandlingstiden bli lenger enn{' '}
                    <span className="font-bold">{dateFormatter.full(frist)}</span>.
                </>
            );
        case Venteårsak.MELDEKORT:
        case Venteårsak.SØKT_FOR_TIDLIG:
        default:
            return (
                <>
                    Du kan forvente svar innen: <br />
                    <span className="block font-bold first-letter:uppercase">{dateFormatter.full(frist)}</span>
                </>
            );
    }
};

const Svarfrist: React.FunctionComponent<Props> = ({ frist, venteårsak, saksbehandlingstidUker = 7 }) => {
    const fristErPassert = frist && dayjs(frist).isBefore(dayjs(), 'day');
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                Saksbehandlingstid
            </Heading>
            <BodyShort as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded">
                {frist && fristErPassert === false ? (
                    <p className="mb-2">{getFristTekst(frist, venteårsak)}</p>
                ) : (
                    <p className="mb-2">
                        Forventet behandlingstid er {saksbehandlingstidUker} uker fra vi fikk søknaden din.
                    </p>
                )}

                <Link variant="neutral" href={browserEnv.NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL}>
                    Les mer om saksbehandlingstid
                </Link>
            </BodyShort>
        </Box>
    );
};

export default Svarfrist;
