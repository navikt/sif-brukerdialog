'use client';
import { Box, Heading, Link, Skeleton } from '@navikt/ds-react';
import axios from 'axios';
import useSWR from 'swr';

import { AppText } from '../../i18n';
import { Saksbehandlingstid, Venteårsak } from '../../types';
import { saksbehandlingstidClientSchema } from '../../types/client-schemas/saksbehandlingstidClientSchema';
import { browserEnv } from '../../utils/env';
import { swrBaseConfig } from '../../utils/swrBaseConfig';
import { SaksbehandlingstidMelding } from './SaksbehandlingstidMelding';

interface Props {
    frist?: Date;
    venteårsak?: Venteårsak;
}

const SaksbehandlingstidPanel = ({ frist, venteårsak }: Props) => {
    const { data, isLoading } = useSWR<Saksbehandlingstid>(
        `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/saksbehandlingstid`,
        (url) => axios.get(url).then((res) => saksbehandlingstidClientSchema.parse(res.data)),
        swrBaseConfig,
    );
    const saksbehandlingstidUker = data?.saksbehandlingstidUker ?? 7;
    return (
        <Box>
            <Heading size="medium" level="2" spacing={true}>
                <AppText id="svarfrist.tittel" />
            </Heading>
            {isLoading ? (
                <Skeleton height="6rem" variant="rounded" />
            ) : (
                <Box paddingBlock="space-16 space-24" paddingInline="space-24" borderRadius="large" background="info-moderateA">
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
                </Box>
            )}
        </Box>
    );
};

export default SaksbehandlingstidPanel;
