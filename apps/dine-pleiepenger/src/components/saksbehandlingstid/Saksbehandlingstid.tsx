'use client';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, HGrid, Hide, Link, Skeleton } from '@navikt/ds-react';
import axios from 'axios';
import useSWR from 'swr';

import { AppText } from '../../i18n';
import SaksbehandlingstidPictogram from '../../svg/SaksbehandlingstidPictogram';
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
                <Box
                    paddingBlock="space-16 space-24"
                    paddingInline="space-24"
                    borderRadius="16"
                    background="info-moderateA">
                    <HGrid gap="space-16" columns={{ xs: 'auto 96px' }} align="center">
                        <Box>
                            <Box className="mb-4">
                                <SaksbehandlingstidMelding
                                    frist={frist}
                                    venteårsak={venteårsak}
                                    saksbehandlingstidUker={saksbehandlingstidUker}
                                />
                            </Box>
                            <Button
                                variant="secondary"
                                type="button"
                                as={Link}
                                icon={<ArrowRightIcon role="presentation" aria-hidden="true" />}
                                iconPosition="right"
                                size="small"
                                className="noTextDecoration"
                                href={browserEnv.NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL}>
                                <AppText id="svarfrist.lesMerLenke" />
                            </Button>
                        </Box>
                        <Hide below="sm">
                            <Box>
                                <SaksbehandlingstidPictogram role="presentation" />
                            </Box>
                        </Hide>
                    </HGrid>
                </Box>
            )}
        </Box>
    );
};

export default SaksbehandlingstidPanel;
