import { BodyLong, Link, List, ReadMore, VStack } from '@navikt/ds-react';

import { UngUiText, useUngUiIntl } from '../../i18n';
import { Lovlenke } from '../../modules/oppgavepaneler/utils/lovverk';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';

interface Props {
    lenker: Lovlenke[];
    ytelsetype: OppgaveYtelsetype;
}
export const RegelverkOgInnsynReadMore = ({ lenker, ytelsetype }: Props) => {
    const { text } = useUngUiIntl();

    if (lenker.length === 0) {
        return null;
    }

    return (
        <ReadMore header={text('@ungInnsyn.regelverkOgInnsyn.readMore.tittel')}>
            <BodyLong>
                {ytelsetype === OppgaveYtelsetype.UNGDOMSYTELSE
                    ? text('@ungInnsyn.regelverkOgInnsyn.readMore.ungdomsytelse')
                    : text('@ungInnsyn.regelverkOgInnsyn.readMore.aktivitetspenger')}
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
