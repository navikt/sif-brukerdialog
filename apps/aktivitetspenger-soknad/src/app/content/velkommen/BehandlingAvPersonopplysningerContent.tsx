import { AppText } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { Heading, Link, List, ReadMore, VStack } from '@navikt/ds-react';
import React from 'react';
import { Todo } from '../../components/Todo';

const BehandlingAvPersonopplysningerContent = () => {
    const lenker = useLenker();

    return (
        <VStack gap="space-8" paddingBlock="space-8 space-0">
            <Todo>
                Tekster er ikke ferdig
                <ReadMore header="Tilbakemelding PVK">
                    I tilknytning til K108.2 Personvern E729.1 Aktivitetspenger - saksbehandling skriver de: Får den
                    registrerte noe informasjon om hvilke opplysninger som behandles om seg, ut over opplysninger om
                    barn, i søknadsdialogen? Det bør gis informasjon om hvilke opplysninger Nav innhenter og behandler
                    om vedkommende før bruker sender inn søknad om aktivitetspenger (suksesskriterium 1). Det samme
                    gjelder når det skjer endringer i antall barn og det blir endringer i barnetillegg. Har vi på plass
                    denne infoen?
                </ReadMore>
            </Todo>
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading level="3" size="xsmall">
                    <AppText id="personopplysninger.3" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.4" />
                </p>

                <List>
                    <List.Item>
                        <AppText id="personopplysninger.4.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.3" />
                    </List.Item>
                </List>
            </div>
            <div>
                <AppText
                    id="personopplysninger.5"
                    values={{
                        Lenke: (children: React.ReactNode) => (
                            <Link href={lenker.navPersonvernerklaering} target="_blank" rel="noopener noreferrer">
                                {children}
                            </Link>
                        ),
                    }}
                />
            </div>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
