import { Bleed, BodyLong, Box, Heading, List, ReadMore, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { ExternalLink } from '../../../../components/external-link/ExternalLink';
import { UngUiText, useUngUiIntl } from '../../../../i18n';
import { ungInnsynLenker } from '../../../../utils/lenker';

interface Props {
    navn: string;
    periode: DateRange;
    svarfrist: Date;
    gjelderDelerAvMåned?: boolean;
}

export const RapporterInntektOppgavetekst = ({ navn, svarfrist, periode, gjelderDelerAvMåned }: Props) => {
    const frist = dateFormatter.full(svarfrist);
    const måned = dateFormatter.month(periode.from);

    const { text } = useUngUiIntl();
    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <UngUiText id="@ungInnsyn.rapporterInntektOppgavetekst.tittel" values={{ navn }} />
            </Heading>
            <Box maxWidth="90%">
                <VStack gap="space-24">
                    <BodyLong>
                        <UngUiText
                            id="@ungInnsyn.rapporterInntektOppgavetekst.intro.1"
                            values={{
                                måned,
                            }}
                        />{' '}
                        <UngUiText id="@ungInnsyn.rapporterInntektOppgavetekst.intro.2" />
                    </BodyLong>
                    {gjelderDelerAvMåned && (
                        <BodyLong>
                            <UngUiText
                                id="@ungInnsyn.rapporterInntektOppgavetekst.intro.delerAvMåned"
                                values={{
                                    måned,
                                }}
                            />
                        </BodyLong>
                    )}
                    <Bleed marginBlock="space-8 space-0">
                        <ReadMore header={text('@ungInnsyn.rapporterInntektOppgave.readMore.tittel')}>
                            <BodyLong>
                                <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.tekst.1" />
                            </BodyLong>
                            <Box marginBlock="space-8 space-24">
                                <List>
                                    <List.Item>
                                        <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.1" />
                                    </List.Item>
                                    <List.Item>
                                        <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.2" />
                                    </List.Item>
                                    <List.Item>
                                        <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.3" />
                                    </List.Item>
                                    <List.Item>
                                        <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.4" />
                                    </List.Item>
                                    <List.Item>
                                        <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.5" />
                                    </List.Item>
                                    <List.Item>
                                        <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.6" />
                                    </List.Item>
                                    <List.Item>
                                        <UngUiText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.7" />
                                    </List.Item>
                                </List>
                            </Box>
                            <BodyLong spacing>
                                <UngUiText
                                    id="@ungInnsyn.rapporterInntektOppgave.readMore.tekst.3"
                                    values={{
                                        link: (value) => (
                                            <ExternalLink
                                                href={ungInnsynLenker.lovdataInntekt}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                {value}
                                            </ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                        </ReadMore>
                    </Bleed>
                    <BodyLong>
                        <UngUiText
                            id="@ungInnsyn.rapporterInntektOppgave.intro.3"
                            values={{ frist, strong: (content: ReactNode) => <strong>{content}</strong> }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <UngUiText
                            id="@ungInnsyn.rapporterInntektOppgave.intro.4"
                            values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                        />
                    </BodyLong>
                </VStack>
            </Box>
        </VStack>
    );
};
