import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import SnarveiLinkCard from '../snarvei-link-card/SnarveiLinkCard';
import { Chat2Icon } from '@navikt/aksel-icons';

const SkrivTilOssLenker = () => {
    const { text } = useAppIntl();
    return (
        <section>
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Har du spørsmål om saken din?
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkCard
                        href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS_URL}
                        icon={<Chat2Icon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title={text('snarveier.skrivTilOss.tittel')}
                    />
                </HGrid>
            </VStack>
        </section>
    );
};

export default SkrivTilOssLenker;
