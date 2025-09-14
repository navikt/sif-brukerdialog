'use client';
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
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

const Saksbehandlingstid = ({ frist, venteårsak, saksbehandlingstidUker = 7 }: Props) => {
    return (
        <Box>
            <Heading size="medium" level="2" spacing={true}>
                <AppText id="svarfrist.tittel" />
            </Heading>
            <Box.New paddingBlock="4 6" paddingInline={'6'} borderRadius="large" background="info-moderateA">
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
            </Box.New>
        </Box>
    );
};

export default Saksbehandlingstid;
