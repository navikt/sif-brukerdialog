import { VStack } from '@navikt/ds-react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Inntektsmelding, Sak } from '../../types';
import { browserEnv } from '../../utils/env';
import LinkButton from '../link-button/LinkButton';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';
import StatusISak from '../status-i-sak/StatusISak';

interface Props {
    sak: Sak;
    inntektsmeldinger: Inntektsmelding[];
}

const HistorikkPage = ({ sak, inntektsmeldinger = [] }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [{ url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Historikk' }],
        saksnummer: sak.saksnummer,
    });

    return (
        <>
            <Head>
                <title>Historikk - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>

            <DefaultPageLayout
                pageHeader={<PageHeader title="Historikk - Dette har skjedd i saken din" hidePleiepengerIcon={true} />}>
                <VStack gap="space-24">
                    <StatusISak sak={sak} visAlleHendelser={true} inntektsmeldinger={inntektsmeldinger} />
                    <div>
                        <LinkButton direction="left" as={NextLink} href={`/sak/${sak.saksnummer}`}>
                            Tilbake til sak
                        </LinkButton>
                    </div>
                </VStack>
            </DefaultPageLayout>
        </>
    );
};

export default HistorikkPage;
