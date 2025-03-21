'use client';
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '../../i18n';
import { Venteårsak } from '../../types/Venteårsak';
import { browserEnv } from '../../utils/env';
import { erSaksbehandlingsfristPassert } from '../../utils/sakUtils';

interface Props {
    frist?: Date;
    saksbehandlingstidUker?: number;
    venteårsak?: Venteårsak;
}

const SaksbehandlingstidMelding = ({ frist, venteårsak, saksbehandlingstidUker }: Props) => {
    if (!frist) {
        return <AppText id="svarfrist.forventetBehandlingstid" values={{ saksbehandlingstidUker }} />;
    }

    if (erSaksbehandlingsfristPassert(frist)) {
        if (venteårsak === Venteårsak.FOR_TIDLIG_SOKNAD) {
            return (
                <AppText
                    id="svarfrist.forTidligSoknad.fristPassert"
                    values={{
                        frist: dateFormatter.full(frist),
                        dato: (chunk) => <strong>{chunk}</strong>,
                        saksbehandlingstidUker,
                    }}
                />
            );
        }
        return (
            <div>
                <BodyShort spacing={true}>
                    <AppText id="svarfrist.fristPassert.1" />
                </BodyShort>
                <BodyShort spacing={true}>
                    <AppText id="svarfrist.fristPassert.2" />
                </BodyShort>
            </div>
        );
    }

    switch (venteårsak) {
        case Venteårsak.INNTEKTSMELDING:
        case Venteårsak.MEDISINSK_DOKUMENTASJON:
        case Venteårsak.MELDEKORT:
            return (
                <AppText
                    id="svarfrist.dokumenterManglerFrist"
                    values={{ frist: dateFormatter.full(frist), dato: (chunk) => <strong>{chunk}</strong> }}
                />
            );
        case Venteårsak.FOR_TIDLIG_SOKNAD:
            return (
                <AppText
                    id="svarfrist.forTidligSoknad"
                    values={{ frist: dateFormatter.full(frist), dato: (chunk) => <strong>{chunk}</strong> }}
                />
            );
        default:
            return (
                <AppText
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
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                <AppText id="svarfrist.tittel" />
            </Heading>
            <BodyShort as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded-xs">
                <Box className="mb-4">
                    <SaksbehandlingstidMelding
                        frist={frist}
                        venteårsak={venteårsak}
                        saksbehandlingstidUker={saksbehandlingstidUker}
                    />
                </Box>
                <Link variant="neutral" href={browserEnv.NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL}>
                    <AppText id="svarfrist.lesMerLenke" />
                </Link>
            </BodyShort>
        </Box>
    );
};

export default Saksbehandlingstid;
