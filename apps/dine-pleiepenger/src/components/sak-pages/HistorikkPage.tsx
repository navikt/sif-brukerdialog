import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button, Heading, VStack } from '@navikt/ds-react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Inntektsmelding, Sak } from '../../types';
import { browserEnv } from '../../utils/env';
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

            <DefaultPageLayout pageHeader={<PageHeader title="Historikk" hidePleiepengerIcon={true} />}>
                <Heading level="2" size="medium" spacing>
                    Hendelser i saken
                </Heading>
                <VStack gap="space-24">
                    <StatusISak sak={sak} visAlleHendelser={true} inntektsmeldinger={inntektsmeldinger} />
                    <div>
                        <Button
                            variant="secondary"
                            type="button"
                            as={NextLink}
                            icon={<ArrowLeftIcon />}
                            iconPosition="left"
                            size="small"
                            href={`/sak/${sak.saksnummer}`}>
                            Tilbake til sak
                        </Button>
                    </div>
                </VStack>
            </DefaultPageLayout>
        </>
    );
};

export default HistorikkPage;
