import { Chat2Icon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';

import { useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import SnarveiLinkCard from '../snarvei-link-card/SnarveiLinkCard';

const SkrivTilOssLenker = () => {
    const { text } = useAppIntl();
    return (
        <section>
            <Heading level="2" size="medium" spacing>
                Har du spørsmål om saken din?
            </Heading>

            <SnarveiLinkCard
                href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS_URL}
                icon={<Chat2Icon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                title={text('snarveier.skrivTilOss.tittel')}
            />
        </section>
    );
};

export default SkrivTilOssLenker;
