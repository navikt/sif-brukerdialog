'use client';
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Msg } from '../../i18n';
import { Venteårsak } from '../../types/Venteårsak';
import { browserEnv } from '../../utils/env';
import { erSaksbehandlingsfristPassert } from '../../utils/sakUtils';

interface Props {
    frist?: Date;
    saksbehandlingstidUker?: number;
    venteårsak?: Venteårsak;
}

const getFristTekst = (frist: Date, venteårsak?: Venteårsak): React.ReactNode => {
    switch (venteårsak) {
        case Venteårsak.INNTEKTSMELDING:
        case Venteårsak.MEDISINSK_DOKUMENTASJON:
        case Venteårsak.MELDEKORT:
            return (
                <Msg
                    id="svarfrist.dokumenterManglerFrist"
                    values={{ frist: dateFormatter.full(frist), dato: (chunk) => <strong>{chunk}</strong> }}
                />
            );
        case Venteårsak.SØKT_FOR_TIDLIG:
        default:
            return (
                <Msg
                    id="svarfrist.generellFrist"
                    values={{
                        frist: dateFormatter.full(frist),
                        dato: (chunk) => <strong>{chunk}</strong>,
                    }}
                />
            );
    }
};

const SaksbehandlingstidMelding = ({ frist, venteårsak, saksbehandlingstidUker }: Props) => {
    const fristErPassert = frist ? erSaksbehandlingsfristPassert(frist) : false;
    if (frist) {
        return fristErPassert ? (
            <>
                <BodyShort spacing={true}>
                    <Msg id="svarfrist.fristPassert.1" />
                </BodyShort>
                <BodyShort spacing={true}>
                    <Msg id="svarfrist.fristPassert.2" />
                </BodyShort>
            </>
        ) : (
            getFristTekst(frist, venteårsak)
        );
    }
    return <Msg id="svarfrist.forventetBehandlingstid" values={{ saksbehandlingstidUker }} />;
};

const Saksbehandlingstid: React.FunctionComponent<Props> = ({ frist, venteårsak, saksbehandlingstidUker = 7 }) => {
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                <Msg id="svarfrist.tittel" />
            </Heading>
            <BodyShort as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded">
                <Box className="mb-2">
                    <SaksbehandlingstidMelding
                        frist={frist}
                        venteårsak={venteårsak}
                        saksbehandlingstidUker={saksbehandlingstidUker}
                    />
                </Box>
                <Link variant="neutral" href={browserEnv.NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL}>
                    <Msg id="svarfrist.lesMerLenke" />
                </Link>
            </BodyShort>
        </Box>
    );
};

export default Saksbehandlingstid;
