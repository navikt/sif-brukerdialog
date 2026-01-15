import { BodyShort, Box, Heading, LinkCard, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import Link from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { AppText, useAppIntl } from '../../i18n';
import { SakerMetadata } from '../../types';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';

interface Props {
    sakerMetadata: SakerMetadata[];
}

const VelgSakPage = ({ sakerMetadata }: Props) => {
    const { text } = useAppIntl();
    useBreadcrumbs({
        breadcrumbs: [],
    });
    return (
        <DefaultPageLayout>
            <Head>
                <title>{text('velgSak.dokumentTittel')}</title>
            </Head>
            <Box>
                <Heading size="medium" level="1" spacing={true}>
                    <AppText id="velgSak.tittel" />
                </Heading>

                <VStack gap="2" className="max-w-2xl mb-10">
                    {sakerMetadata.map((sakMetadata) => {
                        const { pleietrengende, saksnummer } = sakMetadata;
                        const fødselsdato = new Date(pleietrengende.fødselsdato);

                        const navn = pleietrengende.anonymisert
                            ? `Pleietrengende født ${dateFormatter.compact(pleietrengende.fødselsdato)}`
                            : `${pleietrengende.fornavn} ${pleietrengende.etternavn}`;

                        return (
                            <LinkCard key={saksnummer}>
                                <LinkCard.Title className="w-full">
                                    <LinkCard.Anchor asChild>
                                        <Link href={`/sak/${saksnummer}`}>{navn}</Link>
                                    </LinkCard.Anchor>
                                </LinkCard.Title>
                                {!pleietrengende.anonymisert && (
                                    <LinkCard.Description>
                                        <BodyShort>
                                            <AppText
                                                id="velgSak.barn.fdato"
                                                values={{
                                                    dato: dateFormatter.full(fødselsdato),
                                                }}
                                            />
                                        </BodyShort>
                                    </LinkCard.Description>
                                )}
                            </LinkCard>
                        );
                    })}
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default VelgSakPage;
