import { Box, FormSummary, List, VStack } from '@navikt/ds-react';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { AppText, useAppIntl } from '../../../../i18n';
import { KursApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { dateFormatter, dateRangeFormatter, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';

interface Props {
    kurs: KursApiData;
    onEdit?: () => void;
}

const KursOppsummering = ({ onEdit, kurs }: Props) => {
    const { kursholder, perioder } = kurs;
    const { locale } = useAppIntl();
    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummeringkurs.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Kursholder</FormSummary.Label>
                        <FormSummary.Value>{kursholder}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Kursperioder</FormSummary.Label>
                        <FormSummary.Value>
                            <List>
                                {perioder.map((periode) => {
                                    const periodeString = dateRangeFormatter.getDateRangeText(
                                        ISODateRangeToDateRange(periode.kursperiode),
                                        locale,
                                    );
                                    const kursperiode = ISODateRangeToDateRange(periode.kursperiode);
                                    const avreise = periode.avreise ? ISODateToDate(periode.avreise) : kursperiode.from;
                                    const hjemkomst = periode.hjemkomst
                                        ? ISODateToDate(periode.hjemkomst)
                                        : kursperiode.to;

                                    return (
                                        <List.Item title={periodeString} key={periodeString}>
                                            <VStack gap="1">
                                                <Box>
                                                    Avreise: {dateFormatter.compact(avreise)}.
                                                    {periode.beskrivelseReisetidTil ? (
                                                        <Sitat>
                                                            <TextareaSvar
                                                                text={periode.beskrivelseReisetidTil}
                                                                spacing={false}
                                                            />
                                                        </Sitat>
                                                    ) : null}
                                                </Box>
                                                <Box>
                                                    Hjemkomst: {dateFormatter.compact(hjemkomst)}.<br />
                                                    {periode.beskrivelseReisetidHjem ? (
                                                        <Sitat>
                                                            <TextareaSvar
                                                                text={periode.beskrivelseReisetidHjem}
                                                                spacing={false}
                                                            />
                                                        </Sitat>
                                                    ) : null}
                                                </Box>
                                            </VStack>
                                        </List.Item>
                                    );
                                })}
                            </List>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default KursOppsummering;
