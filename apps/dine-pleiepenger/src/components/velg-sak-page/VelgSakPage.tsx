import { BodyShort, Box, Heading, LinkPanel, VStack } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import Link from 'next/link';
import { AppText, useAppIntl } from '../../i18n';
import { PleietrengendeMedSak } from '../../server/api-models/PleietrengendeMedSakSchema';
import { getBehandlingsstatusISak } from '../../utils/sakUtils';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import StatusTag from '../status-tag/StatusTag';
import { personaliaUtils } from '../../utils/personaliaUtils';

interface Props {
    saker: PleietrengendeMedSak[];
}

const VelgSakPage: React.FunctionComponent<Props> = ({ saker }) => {
    const { text } = useAppIntl();
    return (
        <DefaultPageLayout>
            <Head>
                <title>
                    <AppText id="velgSak.dokumentTittel" />
                </title>
            </Head>
            <Box>
                <Heading size="medium" level="1" spacing={true} className="text-deepblue-800">
                    <AppText id="velgSak.tittel" />
                </Heading>

                <VStack gap="5" className="max-w-2xl mb-10">
                    {saker.map((sak) => {
                        const status = getBehandlingsstatusISak(sak.sak);
                        const { pleietrengende } = sak;
                        return (
                            <LinkPanel
                                as={Link}
                                border={false}
                                href={`/sak/${sak.sak.saksnummer}`}
                                key={sak.sak.saksnummer}>
                                <LinkPanel.Title className="w-full">
                                    <Heading as="span" size="small">
                                        {personaliaUtils.navn(pleietrengende, text)}
                                    </Heading>
                                </LinkPanel.Title>
                                {status || pleietrengende.anonymisert === false ? (
                                    <LinkPanel.Description>
                                        <BodyShort spacing={true}>
                                            <AppText
                                                id="velgSak.barn.fdato"
                                                values={{
                                                    dato: dateFormatter.full(pleietrengende.fødselsdato),
                                                }}
                                            />
                                        </BodyShort>

                                        {status ? <StatusTag {...status} /> : null}
                                    </LinkPanel.Description>
                                ) : null}
                            </LinkPanel>
                        );
                    })}
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default VelgSakPage;
