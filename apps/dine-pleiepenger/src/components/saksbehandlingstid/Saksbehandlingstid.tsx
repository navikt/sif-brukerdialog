'use client';
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Venteårsak } from '../../types/Venteårsak';
import { browserEnv } from '../../utils/env';
import { Msg, useMessages } from '../../i18n';
import dayjs from 'dayjs';

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
                <Msg
                    id="svarfrist.dokumenterManglerFrist"
                    values={{ frist: dateFormatter.full(frist), dato: (chunk) => <strong>{chunk}</strong> }}
                />
            );
        case Venteårsak.MELDEKORT:
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

const Saksbehandlingstid: React.FunctionComponent<Props> = ({ frist, venteårsak, saksbehandlingstidUker = 7 }) => {
    const fristErPassert = frist && dayjs(frist).isBefore(dayjs(), 'day');
    const { text } = useMessages();
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                {text('svarfrist.tittel')}
            </Heading>
            <BodyShort as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded">
                {frist && fristErPassert === false ? (
                    <p className="mb-2">{getFristTekst(frist, venteårsak)}</p>
                ) : (
                    <p className="mb-2">{text('svarfrist.forventetBehandlingstid', { saksbehandlingstidUker })}</p>
                )}

                <Link variant="neutral" href={browserEnv.NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL}>
                    {text('svarfrist.lesMerLenke')}
                </Link>
            </BodyShort>
        </Box>
    );
};

export default Saksbehandlingstid;
