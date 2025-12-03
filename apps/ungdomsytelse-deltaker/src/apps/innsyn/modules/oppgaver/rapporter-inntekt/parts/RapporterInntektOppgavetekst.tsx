import { Bleed, BodyLong, Box, Heading, List, ReadMore, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';
import ExternalLink from '@shared/components/external-link/ExternalLink';
import { AppText, useAppIntl } from '@shared/i18n';
import getLenker from '@shared/utils/lenker';

interface Props {
    deltakerNavn: string;
    periode: DateRange;
    svarfrist: Date;
    gjelderDelerAvMåned?: boolean;
}

const RapporterInntektOppgavetekst = ({ deltakerNavn, svarfrist, periode, gjelderDelerAvMåned }: Props) => {
    const frist = dateFormatter.full(svarfrist);
    const måned = dateFormatter.month(periode.from);

    const { text } = useAppIntl();
    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                <AppText id="rapporterInntektOppgavetekst.tittel" values={{ deltakerNavn }} />
            </Heading>
            <Box maxWidth="90%">
                <VStack gap="6">
                    <BodyLong>
                        <AppText
                            id="rapporterInntektOppgavetekst.intro.1"
                            values={{
                                måned,
                            }}
                        />{' '}
                        <AppText id="rapporterInntektOppgavetekst.intro.2" />
                    </BodyLong>
                    {gjelderDelerAvMåned && (
                        <BodyLong>
                            <AppText
                                id="rapporterInntektOppgavetekst.intro.sisteMåned"
                                values={{
                                    måned,
                                }}
                            />
                        </BodyLong>
                    )}
                    <Bleed marginBlock="2 0">
                        <ReadMore header={text('rapporterInntektOppgave.readMore.tittel')}>
                            <BodyLong>
                                <AppText id="rapporterInntektOppgave.readMore.tekst.1" />
                            </BodyLong>
                            <Box marginBlock="2 6">
                                <List>
                                    <List.Item>
                                        <AppText id="rapporterInntektOppgave.readMore.liste.1" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="rapporterInntektOppgave.readMore.liste.2" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="rapporterInntektOppgave.readMore.liste.3" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="rapporterInntektOppgave.readMore.liste.4" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="rapporterInntektOppgave.readMore.liste.5" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="rapporterInntektOppgave.readMore.liste.6" />
                                    </List.Item>
                                    <List.Item>
                                        <AppText id="rapporterInntektOppgave.readMore.liste.7" />
                                    </List.Item>
                                </List>
                            </Box>
                            <BodyLong spacing>
                                <AppText
                                    id="rapporterInntektOppgave.readMore.tekst.3"
                                    values={{
                                        link: (value) => (
                                            <ExternalLink href={getLenker().lovdataInntekt} target="_blank">
                                                {value}
                                            </ExternalLink>
                                        ),
                                    }}
                                />
                            </BodyLong>
                        </ReadMore>
                    </Bleed>
                    <BodyLong>
                        <AppText
                            id="rapporterInntektOppgave.intro.3"
                            values={{ frist, strong: (content) => <strong>{content}</strong> }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <AppText
                            id="rapporterInntektOppgave.intro.4"
                            values={{ strong: (content) => <strong>{content}</strong> }}
                        />
                    </BodyLong>
                </VStack>
            </Box>
        </VStack>
    );
};

export default RapporterInntektOppgavetekst;
