import { BodyShort, Box, Heading, LinkCard, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import Link from 'next/link';

import { AppText, useAppIntl } from '../../i18n';
import { PleietrengendeMedSak } from '../../server/api-models/PleietrengendeMedSakSchema';
import { personaliaUtils } from '../../utils/personaliaUtils';
import { getBehandlingsstatusISak } from '../../utils/sakUtils';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import StatusTag from '../status-tag/StatusTag';

interface Props {
    saker: PleietrengendeMedSak[];
}

const VelgSakPage = ({ saker }: Props) => {
    const { text } = useAppIntl();
    return (
        <DefaultPageLayout>
            <Head>
                <title>
                    <AppText id="velgSak.dokumentTittel" />
                </title>
            </Head>
            <Box>
                <Heading size="medium" level="1" spacing={true}>
                    <AppText id="velgSak.tittel" />
                </Heading>

                <VStack gap="5" className="max-w-2xl mb-10">
                    {saker.map((sak) => {
                        const status = getBehandlingsstatusISak(sak.sak);
                        const { pleietrengende } = sak;
                        return (
                            <LinkCard key={sak.sak.saksnummer}>
                                <LinkCard.Title className="w-full">
                                    <LinkCard.Anchor asChild>
                                        <Link href={`/sak/${sak.sak.saksnummer}`}>
                                            {personaliaUtils.navn(pleietrengende, text)}
                                        </Link>
                                    </LinkCard.Anchor>
                                </LinkCard.Title>
                                {status || pleietrengende.anonymisert === false ? (
                                    <LinkCard.Description>
                                        <BodyShort spacing={true}>
                                            <AppText
                                                id="velgSak.barn.fdato"
                                                values={{
                                                    dato: dateFormatter.full(pleietrengende.fødselsdato),
                                                }}
                                            />
                                        </BodyShort>
                                        {status ? <StatusTag {...status} /> : null}
                                    </LinkCard.Description>
                                ) : null}
                            </LinkCard>
                        );
                    })}
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default VelgSakPage;
