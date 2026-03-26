import { BodyLong, Link, List, ReadMore, VStack } from '@navikt/ds-react';

import { UngUiText, useUngUiIntl } from '@ui/i18n';

const RegelverkOgInnsynReadMore = () => {
    const { text } = useUngUiIntl();
    return (
        <ReadMore header={text('regelverkOgInnsyn.readMore.tittel')}>
            <BodyLong>
                <UngUiText id="regelverkOgInnsyn.readMore.tekst.1" />
            </BodyLong>
            <VStack gap="space-24">
                <List>
                    <List.Item>
                        <Link href="https://lovdata.no/dokument/NL/lov/2004-12-10-76">
                            <UngUiText id="regelverkOgInnsyn.readMore.paragraf" />
                        </Link>
                    </List.Item>
                    <List.Item>
                        <Link href="https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182">
                            <UngUiText id="regelverkOgInnsyn.readMore.forskrift" />
                        </Link>
                    </List.Item>
                </List>
                <BodyLong>
                    <UngUiText
                        id="regelverkOgInnsyn.readMore.dokumenter"
                        values={{ link: (content) => <Link href="https://www.nav.no/innsynskrav">{content}</Link> }}
                    />
                </BodyLong>
            </VStack>
        </ReadMore>
    );
};

export default RegelverkOgInnsynReadMore;
