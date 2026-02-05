import { Alert, BodyLong, BodyShort, Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import OppdatereSakLenker from '../../components/oppdatere-sak-lenker/OppdatereSakLenker';
import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';
import SakPageHeader from '../../components/page-layout/sak-page-header/SakPageHeader';
import SaksbehandlingstidPanel from '../../components/saksbehandlingstid/Saksbehandlingstid';
import SkrivTilOssLenker from '../../components/skriv-til-oss-lenker/SkrivTilOssLenker';
import SnarveierSak from '../../components/snarveier-sak/SnarveierSak';
import VenteårsakMelding from '../../components/venteårsak-melding/VenteårsakMelding';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { AppText } from '../../i18n';
import { BehandlingStatus, PleietrengendeMedSak } from '../../types';
import { getBehandlingsstatusISak } from '../../utils/sakUtils';
import PageHeader from '../page-layout/page-header/PageHeader';
import StatusISak from '../status-i-sak/StatusISak';
import StatusTag from '../status-tag/StatusTag';

interface Props {
    saksnr: string;
    pleietrengendeMedSak?: PleietrengendeMedSak;
    isLoading?: boolean;
    isError?: boolean;
}

const SakPage = ({ saksnr, pleietrengendeMedSak, isLoading, isError }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [],
        saksnummer: saksnr,
    });

    const statusISak = pleietrengendeMedSak ? getBehandlingsstatusISak(pleietrengendeMedSak.sak) : undefined;

    const { sak, inntektsmeldinger, pleietrengende } = pleietrengendeMedSak || {};

    const getContent = () => {
        const tittel = 'Dette har skjedd i saken din';
        if (sak) {
            return <StatusISak sak={sak} tittel={tittel} inntektsmeldinger={inntektsmeldinger || []} />;
        }
        if (isLoading) {
            return (
                <div>
                    <Heading size="medium" level="2" spacing={true}>
                        {tittel}
                    </Heading>
                    <VStack gap="space-16">
                        <Skeleton height="6rem" variant="rounded" />
                        <Skeleton height="6rem" variant="rounded" />
                        <Skeleton height="6rem" variant="rounded" />
                    </VStack>
                </div>
            );
        }
        return (
            <div>
                <Heading size="medium" level="2" spacing={true}>
                    {tittel}
                </Heading>
                <Alert variant="error">
                    {isError ? (
                        <BodyLong>
                            Det oppstod en feil når vi hentet informasjon om pleiepengesaken din. Prøv igjen senere.
                        </BodyLong>
                    ) : (
                        <BodyLong>
                            Vi klarte dessverre ikke å hente informasjon om pleiepengesaken din. Prøv igjen senere.
                        </BodyLong>
                    )}
                </Alert>
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>Din pleiepengesak for sykt barn - {saksnr}</title>
            </Head>
            <DefaultPageLayout
                pageHeader={
                    pleietrengende ? (
                        <SakPageHeader pleietrengende={pleietrengende} saksnr={saksnr} />
                    ) : (
                        <PageHeader
                            title="Din pleiepengesak for sykt barn"
                            byline={
                                <BodyShort>
                                    <AppText id="sakPageHeader.saksnr" values={{ saksnr }} />
                                </BodyShort>
                            }
                        />
                    )
                }>
                <VStack gap="space-48">
                    <HStack gap="space-8" align="center">
                        <BodyShort weight="semibold">Status på sak:</BodyShort>
                        {statusISak ? (
                            <StatusTag {...statusISak} />
                        ) : (
                            <Skeleton height="1.5rem" width="10rem" variant="rounded" />
                        )}
                    </HStack>

                    {statusISak?.status !== BehandlingStatus.AVSLUTTET && (
                        <>
                            {statusISak?.venteårsak && <VenteårsakMelding venteårsak={statusISak.venteårsak} />}
                            <VStack gap="space-20">
                                <SaksbehandlingstidPanel
                                    frist={sak?.utledetStatus.saksbehandlingsFrist}
                                    venteårsak={statusISak?.venteårsak}
                                    sakErLastet={!!sak}
                                />
                            </VStack>
                        </>
                    )}

                    {getContent()}

                    <OppdatereSakLenker />

                    <SkrivTilOssLenker />

                    <SnarveierSak saksnummer={saksnr} />
                </VStack>
            </DefaultPageLayout>
        </>
    );
};

export default SakPage;
