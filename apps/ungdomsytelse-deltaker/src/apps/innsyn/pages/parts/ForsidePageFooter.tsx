import UngdomsprogrammetHeader from '@innsyn/atoms/ungdomsprogrammet-header/UngdomsprogrammetHeader';
import { BodyLong, HGrid, LinkPanel, VStack } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';
import getLenker from '@shared/utils/lenker';

const ForsidePageFooter = () => {
    return (
        <HGrid columns="1fr auto">
            <VStack gap="6">
                <UngdomsprogrammetHeader />

                <BodyLong>
                    <AppText id="forsidePageFooter.info" />
                </BodyLong>

                <HGrid columns={{ sm: '1fr 1fr' }} gap="4">
                    <LinkPanel
                        border={false}
                        style={{ borderRadius: '0.5rem' }}
                        href={getLenker().omUngdomsprogramytelsen}>
                        <AppText id="forsidePageFooter.omUngdomsprogrammetLenke" />
                    </LinkPanel>
                    <LinkPanel border={false} style={{ borderRadius: '0.5rem' }} href={getLenker().skrivtilOss}>
                        <AppText id="forsidePageFooter.kontaktOssLenke" />
                    </LinkPanel>
                </HGrid>
            </VStack>
        </HGrid>
    );
};

export default ForsidePageFooter;
