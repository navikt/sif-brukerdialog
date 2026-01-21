import { BodyLong, Link, List, ReadMore, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '@shared/i18n';

const RegelverkOgInnsynReadMore = () => {
    const { text } = useAppIntl();
    return (
        <ReadMore header={text('regelverkOgInnsyn.readMore.tittel')}>
            <BodyLong>
                <AppText id="regelverkOgInnsyn.readMore.tekst.1" />
            </BodyLong>
            <VStack gap="space-24">
                <List>
                    <List.Item>
                        <Link href="https://lovdata.no/dokument/NL/lov/2004-12-10-76">
                            <AppText id="regelverkOgInnsyn.readMore.paragraf" />
                        </Link>
                    </List.Item>
                    <List.Item>
                        <Link href="https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182">
                            <AppText id="regelverkOgInnsyn.readMore.forskrift" />
                        </Link>
                    </List.Item>
                </List>
                <BodyLong>
                    <AppText
                        id="regelverkOgInnsyn.readMore.dokumenter"
                        values={{ link: (content) => <Link href="https://www.nav.no/innsynskrav">{content}</Link> }}
                    />
                </BodyLong>
            </VStack>
        </ReadMore>
    );
};

export default RegelverkOgInnsynReadMore;
