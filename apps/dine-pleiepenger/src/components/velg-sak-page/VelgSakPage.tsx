import { Box, Heading, LinkPanel, VStack } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import Link from 'next/link';
import { Msg } from '../../i18n';
import { PleietrengendeMedSak } from '../../server/api-models/PleietrengendeMedSakSchema';
import { personaliaUtils } from '../../utils/personaliaUtils';
import { getBehandlingsstatusISak } from '../../utils/sakUtils';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import StatusTag from '../status-tag/StatusTag';

interface Props {
    saker: PleietrengendeMedSak[];
}

const VelgSakPage: React.FunctionComponent<Props> = ({ saker }) => {
    return (
        <DefaultPageLayout>
            <Head>
                <title>
                    <Msg id="velgSak.dokumentTittel" />
                </title>
            </Head>
            <Box>
                <Heading size="medium" level="1" spacing={true} className="text-deepblue-800">
                    <Msg id="velgSak.tittel" />
                </Heading>

                <VStack gap="5" className="max-w-2xl mb-10">
                    {saker.map((sak) => (
                        <LinkPanel
                            as={Link}
                            border={false}
                            href={`/sak/${sak.sak.saksnummer}`}
                            key={sak.sak.saksnummer}>
                            <LinkPanel.Title className="w-full">
                                <Heading as="span" size="small">
                                    {personaliaUtils.navn(sak.pleietrengende)}
                                </Heading>
                            </LinkPanel.Title>
                            <LinkPanel.Description>
                                <p>
                                    <Msg
                                        id="velgSak.barn.fdato"
                                        values={{ dato: dateFormatter.full(sak.pleietrengende.fødselsdato) }}
                                    />
                                </p>
                                <StatusTag {...getBehandlingsstatusISak(sak.sak)} />
                            </LinkPanel.Description>
                        </LinkPanel>
                    ))}
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default VelgSakPage;
