import { BodyLong, Link, List, ReadMore, VStack } from '@navikt/ds-react';

import { UngUiText, useUngUiIntl } from '../../i18n';
import { Lovlenke } from '../../modules/oppgavepaneler/utils/lovverk';

interface Props {
    lenker: Lovlenke[];
}
export const RegelverkOgInnsynReadMore = ({ lenker }: Props) => {
    const { text } = useUngUiIntl();

    if (lenker.length === 0) {
        return null;
    }

    return (
        <ReadMore header={text('@ungInnsyn.regelverkOgInnsyn.readMore.tittel')}>
            <BodyLong>
                <UngUiText id="@ungInnsyn.regelverkOgInnsyn.readMore.tekst.1" />
            </BodyLong>
            <VStack gap="space-24">
                <List>
                    {lenker.map((lenke) => (
                        <List.Item key={lenke.url}>
                            <Link href={lenke.url} target="_blank" rel="noopener noreferrer">
                                {lenke.tekst}
                            </Link>
                        </List.Item>
                    ))}
                </List>
                <BodyLong>
                    <UngUiText
                        id="@ungInnsyn.regelverkOgInnsyn.readMore.dokumenter"
                        values={{ link: (content) => <Link href="https://www.nav.no/innsynskrav">{content}</Link> }}
                    />
                </BodyLong>
            </VStack>
        </ReadMore>
    );
};
