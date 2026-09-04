import { Bleed, BodyLong, Box, Heading, List, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter, DateRange, ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { ExternalLink } from '../../../../components/external-link/ExternalLink';
import { UngInnsynText, useUngInnsynIntl } from '../../../../i18n';
import { ungInnsynLenker } from '../../../../utils/lenker';

interface Props {
    navn: string;
    periode: DateRange;
    svarfrist: ISODate;
    gjelderDelerAvMåned?: boolean;
}

export const RapporterInntektOppgavetekst = ({ navn, svarfrist, periode, gjelderDelerAvMåned }: Props) => {
    const frist = dateFormatter.full(svarfrist);
    const måned = dateFormatter.month(periode.from);

    const { text } = useUngInnsynIntl();
    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <UngInnsynText id="@ungInnsyn.rapporterInntektOppgavetekst.tittel" values={{ navn }} />
            </Heading>
            <Box maxWidth="90%">
                <VStack gap="space-24">
                    <BodyLong>
                        <UngInnsynText
                            id="@ungInnsyn.rapporterInntektOppgavetekst.intro.1"
                            values={{
                                måned,
                            }}
                        />{' '}
                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgavetekst.intro.2" />
                    </BodyLong>
                    {gjelderDelerAvMåned && (
                        <BodyLong>
                            <UngInnsynText
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
                                <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.tekst.1" />
                            </BodyLong>
                            <Box marginBlock="space-8 space-24">
                                <List>
                                    <List.Item>
                                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.1" />
                                    </List.Item>
                                    <List.Item>
                                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.2" />
                                    </List.Item>
                                    <List.Item>
                                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.3" />
                                    </List.Item>
                                    <List.Item>
                                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.4" />
                                    </List.Item>
                                    <List.Item>
                                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.5" />
                                    </List.Item>
                                    <List.Item>
                                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.6" />
                                    </List.Item>
                                    <List.Item>
                                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgave.readMore.liste.7" />
                                    </List.Item>
                                </List>
                            </Box>
                            <BodyLong spacing>
                                <UngInnsynText
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
                        <UngInnsynText
                            id="@ungInnsyn.rapporterInntektOppgave.intro.3"
                            values={{ frist, strong: (content: ReactNode) => <strong>{content}</strong> }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <UngInnsynText
                            id="@ungInnsyn.rapporterInntektOppgave.intro.4"
                            values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                        />
                    </BodyLong>
                </VStack>
            </Box>
        </VStack>
    );
};
