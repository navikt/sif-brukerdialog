import UngdomsprogrammetBanner from '@innsyn/atoms/ungdomsprogrammet-banner/UngdomsprogrammetBanner';
import { BodyLong, HGrid, LinkCard, VStack } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';
import getLenker from '@shared/utils/lenker';

const ForsidePageFooter = () => {
    return (
        <HGrid columns="1fr auto">
            <VStack gap="space-24">
                <UngdomsprogrammetBanner />

                <BodyLong>
                    <AppText id="forsidePageFooter.info" />
                </BodyLong>

                <HGrid columns={{ sm: '1fr 1fr' }} gap="space-16">
                    <LinkCard>
                        <LinkCard.Title>
                            <LinkCard.Anchor href={getLenker().omUngdomsprogramytelsen}>
                                <AppText id="forsidePageFooter.omUngdomsprogrammetLenke" />
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                    </LinkCard>
                    <LinkCard>
                        <LinkCard.Title>
                            <LinkCard.Anchor href={getLenker().skrivtilOss}>
                                <AppText id="forsidePageFooter.kontaktOssLenke" />
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                    </LinkCard>
                </HGrid>
            </VStack>
        </HGrid>
    );
};

export default ForsidePageFooter;
