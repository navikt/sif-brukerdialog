import { BodyShort, Box, Heading, LinkCard, VStack } from '@navikt/ds-react';
import { SakerMetadataDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import Link from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { AppText } from '../../i18n';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';

interface Props {
    sakerMetadata: SakerMetadataDto[];
}

const VelgSakPage = ({ sakerMetadata }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [],
    });
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
                    {sakerMetadata.map((sakMetadata) => {
                        const { pleietrengende, saksnummer } = sakMetadata;
                        const fødselsdato = new Date(pleietrengende.fødselsdato);
                        const navn = `${pleietrengende.fornavn} ${pleietrengende.etternavn}`;

                        return (
                            <LinkCard key={saksnummer}>
                                <LinkCard.Title className="w-full">
                                    <LinkCard.Anchor asChild>
                                        <Link href={`/sak/${saksnummer}`}>{navn}</Link>
                                    </LinkCard.Anchor>
                                </LinkCard.Title>
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
                            </LinkCard>
                        );
                    })}
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default VelgSakPage;
