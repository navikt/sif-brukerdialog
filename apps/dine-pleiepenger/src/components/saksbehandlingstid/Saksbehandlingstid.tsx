'use client';
import { Box, Heading, HGrid, Hide, Link, Skeleton, VStack } from '@navikt/ds-react';
import axios from 'axios';
import useSWR from 'swr';

import { AppText } from '../../i18n';
import SaksbehandlingstidPictogram from '../../svg/SaksbehandlingstidPictogram';
import { Saksbehandlingstid, Venteårsak } from '../../types';
import { saksbehandlingstidClientSchema } from '../../types/client-schemas/saksbehandlingstidClientSchema';
import { browserEnv } from '../../utils/env';
import { swrBaseConfig } from '../../utils/swrBaseConfig';
import LinkButton from '../link-button/LinkButton';
import { SaksbehandlingstidMelding } from './SaksbehandlingstidMelding';

interface Props {
    frist?: Date;
    venteårsak?: Venteårsak;
    sakErLastet?: boolean;
}

const SaksbehandlingstidPanel = ({ frist, venteårsak, sakErLastet }: Props) => {
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
            {isLoading || !sakErLastet ? (
                <Skeleton height="6rem" variant="rounded" />
            ) : (
                <Box
                    paddingBlock="space-24 space-24"
                    paddingInline="space-24"
                    borderRadius="16"
                    background="info-moderateA">
                    <HGrid gap="space-16" columns={{ sm: 'auto 96px' }} align="center">
                        <VStack gap="space-16">
                            <SaksbehandlingstidMelding
                                frist={frist}
                                venteårsak={venteårsak}
                                saksbehandlingstidUker={saksbehandlingstidUker}
                            />
                            <div>
                                <LinkButton
                                    as={Link}
                                    direction="external"
                                    href={browserEnv.NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL}>
                                    <AppText id="svarfrist.lesMerLenke" />
                                </LinkButton>
                            </div>
                        </VStack>
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
