import { Heading, HGrid, LinkCard } from '@navikt/ds-react';
import Link from 'next/link';

import { AppText } from '../../i18n';
import { browserEnv } from '../../utils/env';
import { Feature } from '../../utils/features';

interface Props {
    saksnummer?: string;
}
const SnarveierSak = ({ saksnummer }: Props) => {
    const { INNTEKTSMELDING_ENABLED } = Feature;
    return (
        <>
            <Heading size="medium" level="2" spacing={true}>
                <AppText id="snarveierSak.tittel" />
            </Heading>
            <HGrid gap="space-8" columns={{ xs: 1, md: INNTEKTSMELDING_ENABLED ? 2 : 3 }}>
                <LinkCard>
                    <LinkCard.Title>
                        <LinkCard.Anchor href={browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}>
                            <AppText id="snarveierSak.dokumentarkiv" />
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                </LinkCard>
                {INNTEKTSMELDING_ENABLED && (
                    <LinkCard>
                        <LinkCard.Title>
                            <LinkCard.Anchor
                                asChild
                                href={`${browserEnv.NEXT_PUBLIC_BASE_PATH}/sak/${saksnummer}/inntektsmelding`}>
                                <Link href={`/sak/${saksnummer}/inntektsmelding`}>Inntektsmeldinger</Link>
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                    </LinkCard>
                )}

                <LinkCard>
                    <LinkCard.Title>
                        <LinkCard.Anchor href={browserEnv.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL}>
                            <AppText id="snarveierSak.utbetalinger" />
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                </LinkCard>
                <LinkCard>
                    <LinkCard.Title>
                        <LinkCard.Anchor href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_INFO_URL}>
                            <AppText id="snarveierSak.omPleiepenger" />
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                </LinkCard>
            </HGrid>
        </>
    );
};

export default SnarveierSak;
