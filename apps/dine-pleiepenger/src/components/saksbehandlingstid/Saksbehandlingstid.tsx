'use client';
import { Box, Heading, Link, Skeleton } from '@navikt/ds-react';
import { AppText } from '../../i18n';
import { Venteårsak } from '../../types/Venteårsak';
import { browserEnv } from '../../utils/env';
import useSWR from 'swr';
import { Saksbehandlingstid as SaksbehandlingstidSchema } from '../../server/api-models/SaksbehandlingstidSchema';
import axios from 'axios';
import { SaksbehandlingstidMelding } from './SaksbehandlingstidMelding';

interface Props {
    frist?: Date;
    venteårsak?: Venteårsak;
}

const saksbehandlingstidFetcher = async (url: string): Promise<SaksbehandlingstidSchema> =>
    axios.get(url).then((res) => res.data);

const Saksbehandlingstid = ({ frist, venteårsak }: Props) => {
    const { data, isLoading } = useSWR(
        `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/saksbehandlingstid`,
        saksbehandlingstidFetcher,
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
            )}
        </Box>
    );
};

export default Saksbehandlingstid;
