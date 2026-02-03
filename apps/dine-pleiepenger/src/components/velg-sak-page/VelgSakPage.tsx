import { BodyShort, Box, Heading, LinkCard, Tag, VStack } from '@navikt/ds-react';
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

    const renderDescription = (sakMetadata: SakerMetadata) => {
        const {
            sisteInnsendingTidspunkt,
            pleietrengende: { fødselsdato, anonymisert },
        } = sakMetadata;

        if (anonymisert && sisteInnsendingTidspunkt === undefined) {
            return null;
        }
        return (
            <LinkCard.Description>
                <VStack gap="space-4">
                    {anonymisert === false && (
                        <BodyShort>
                            <AppText
                                id="velgSak.barn.fdato"
                                values={{
                                    dato: dateFormatter.full(fødselsdato),
                                }}
                            />
                            .
                        </BodyShort>
                    )}
                    {sisteInnsendingTidspunkt ? (
                        <div>
                            <Tag variant="moderate" data-color="info" size="small">
                                Sist innsendt {dateFormatter.compactWithTime(sisteInnsendingTidspunkt)}
                            </Tag>
                        </div>
                    ) : null}
                </VStack>
            </LinkCard.Description>
        );
    };

    return (
        <DefaultPageLayout>
            <Head>
                <title>{text('velgSak.dokumentTittel')}</title>
            </Head>
            <Box>
                <Heading size="medium" level="1" spacing={true}>
                    <AppText id="velgSak.tittel" />
                </Heading>

                <VStack gap="space-8">
                    {sakerMetadata.map((sakMetadata) => {
                        const { pleietrengende, saksnummer } = sakMetadata;

                        const navn = pleietrengende.anonymisert
                            ? `Pleietrengende født ${dateFormatter.compact(pleietrengende.fødselsdato)}`
                            : `${pleietrengende.fornavn} ${pleietrengende.etternavn}`;

                        return (
                            <LinkCard key={saksnummer}>
                                <LinkCard.Title>
                                    <LinkCard.Anchor asChild>
                                        <Link href={`/sak/${saksnummer}`}>{navn}</Link>
                                    </LinkCard.Anchor>
                                </LinkCard.Title>
                                {renderDescription(sakMetadata)}
                            </LinkCard>
                        );
                    })}
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default VelgSakPage;
