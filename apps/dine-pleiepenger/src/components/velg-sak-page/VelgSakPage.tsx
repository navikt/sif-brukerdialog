import { BodyShort, Box, Heading, LinkCard, Tag, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import Link from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { AppText, useAppIntl } from '../../i18n';
import { SakerMetadata } from '../../types';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import { grupperSakerPåPleietrengende } from './velgSakPageUtils';

interface Props {
    sakerMetadata: SakerMetadata[];
}

const VelgSakPage = ({ sakerMetadata }: Props) => {
    const { text } = useAppIntl();
    useBreadcrumbs({
        breadcrumbs: [],
    });

    const grupperteSaker = grupperSakerPåPleietrengende(sakerMetadata);

    const renderDescription = (sakMetadata: SakerMetadata) => {
        const {
            fagsakOpprettetTidspunkt,
            pleietrengende: { fødselsdato, anonymisert },
        } = sakMetadata;

        if (anonymisert && fagsakOpprettetTidspunkt === undefined) {
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
                    {fagsakOpprettetTidspunkt ? (
                        <div>
                            <Tag variant="moderate" data-color="info" size="small">
                                Opprettet {dateFormatter.compact(fagsakOpprettetTidspunkt)}
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
                    {grupperteSaker.map((gruppe) => {
                        const { pleietrengende, saker } = gruppe;
                        return (
                            <VStack
                                gap="space-8"
                                key={`${pleietrengende.fødselsdato.toDateString()}-${pleietrengende.navn}`}>
                                {saker.map((sakMetadata) => {
                                    const { saksnummer } = sakMetadata;

                                    return (
                                        <LinkCard key={saksnummer}>
                                            <LinkCard.Title>
                                                <LinkCard.Anchor asChild>
                                                    <Link href={`/sak/${saksnummer}`}>{pleietrengende.navn}</Link>
                                                </LinkCard.Anchor>
                                            </LinkCard.Title>
                                            {renderDescription(sakMetadata)}
                                        </LinkCard>
                                    );
                                })}
                            </VStack>
                        );
                    })}
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default VelgSakPage;
