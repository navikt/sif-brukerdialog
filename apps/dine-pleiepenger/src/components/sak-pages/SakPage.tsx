import { Alert, BodyShort, Box, Heading, Skeleton, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import OppdatereSakLenker from '../../components/oppdatere-sak-lenker/OppdatereSakLenker';
import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';
import SakPageHeader from '../../components/page-layout/sak-page-header/SakPageHeader';
import SaksbehandlingstidPanel from '../../components/saksbehandlingstid/Saksbehandlingstid';
import SkrivTilOssLenker from '../../components/skriv-til-oss-lenker/SkrivTilOssLenker';
import SnarveierSak from '../../components/snarveier-sak/SnarveierSak';
import StatusTag from '../../components/status-tag/StatusTag';
import VenteårsakMelding from '../../components/venteårsak-melding/VenteårsakMelding';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { AppText } from '../../i18n';
import { BehandlingStatus, PleietrengendeMedSak } from '../../types';
import { getBehandlingsstatusISak } from '../../utils/sakUtils';
import PageHeader from '../page-layout/page-header/PageHeader';
import StatusISak from '../status-i-sak/StatusISak';

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
        // Vi beholder samme tittel som når vi har info */
        const tittel = 'Dette skjer i saken';
        if (sak) {
            return <StatusISak sak={sak} tittel={tittel} inntektsmeldinger={inntektsmeldinger || []} />;
        }
        if (isLoading) {
            return (
                <>
                    <Heading size="medium" level="2" spacing={true}>
                        {tittel}
                    </Heading>
                    <VStack gap="4">
                        <Skeleton height="6rem" variant="rounded" />
                        <Skeleton height="6rem" variant="rounded" />
                        <Skeleton height="6rem" variant="rounded" />
                    </VStack>
                </>
            );
        }
        return (
            <>
                <Heading size="medium" level="2" spacing={true}>
                    {tittel}
                </Heading>
                <Alert variant="error" className="mb-6">
                    {isError ? (
                        <BodyShort>
                            Det oppstod en feil når vi hentet informasjon om pleiepengesaken din. Prøv igjen senere.
                        </BodyShort>
                    ) : (
                        <BodyShort>
                            Vi klarte dessverre ikke å hente informasjon om pleiepengesaken din. Prøv igjen senere.
                        </BodyShort>
                    )}
                </Alert>
            </>
        );
    };

    return (
        <DefaultPageLayout
            pageHeader={
                pleietrengende ? (
                    <SakPageHeader
                        pleietrengende={pleietrengende}
                        saksnr={saksnr}
                        titleTag={statusISak ? <StatusTag {...statusISak} /> : null}
                    />
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
            <Head>
                <title>Din pleiepengesak for sykt barn - {saksnr}</title>
            </Head>
            <VStack gap="12">
                {statusISak?.venteårsak && statusISak.status !== BehandlingStatus.AVSLUTTET ? (
                    <VenteårsakMelding venteårsak={statusISak.venteårsak} />
                ) : null}
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">{getContent()}</div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        {statusISak?.status === BehandlingStatus.AVSLUTTET ? null : (
                            <VStack gap="5">
                                <SaksbehandlingstidPanel
                                    frist={sak ? sak.utledetStatus.saksbehandlingsFrist : undefined}
                                    venteårsak={statusISak?.venteårsak}
                                />
                            </VStack>
                        )}
                    </div>
                </Box>
                <Box>
                    <OppdatereSakLenker />
                </Box>
                <Box>
                    <SkrivTilOssLenker />
                </Box>
                <Box className="mb-10">
                    <SnarveierSak saksnummer={saksnr} />
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
};

export default SakPage;
